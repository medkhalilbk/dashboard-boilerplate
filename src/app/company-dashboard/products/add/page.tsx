"use client"
import React, { useState, useEffect } from 'react'; 
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import axios from 'axios'; 
import { Input } from '@/components/ui/input';
import { set, useForm } from 'react-hook-form';
import { IProduct } from '@/types/product';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Button } from '@/components/ui/button';
import Slider from 'react-slick';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Swal from 'sweetalert2';
export default function AddProduct() {
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setPreviewImage(URL.createObjectURL(file));
            setShowDropZone(false)
            setFile(file);
        }
    };
    const [previewImages, setPreviewImages] = useState<string []>([])
    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
    };
    const settings = { 
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1, 
      verticalSwiping: true,
      };  
    const [showDropZone, setShowDropZone] = useState(false);
    const [previewImage,setPreviewImage] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const { handleSubmit, control,setValue, register, formState: { errors } , getValues } = useForm<any>({
        defaultValues: {
            name: "",
            price: 0,
            inStock: true,
            description: "",
            mainImageUrl: "", 
    }})
    const onSubmit = async () => {
      event?.preventDefault()
      let data = getValues()  
      let formData = new FormData();
 
  
    }
 
 
    
    return (
      <div>
          <h1 className='font-bold text-2xl text-center'>Ajouter un produit</h1> 
          <div className="block my-2">
              <div className="w-full"> 
                  <div className='flex flex-row justify-center my-2'>
                      <Button className="mx-auto" onClick={() => {
                        setShowDropZone(!showDropZone)
                      }}>Choisir l'image</Button>
                  </div>
              </div>
             {showDropZone &&  <div className="mx-auto w-1/2">
                  <div className="flex items-center justify-center w-full"  >
                      <label onDrop={handleDrop}
                  onDragOver={handleDragOver} htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2"/>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou faites glisser et déposez</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">JPEG, JPG Ou PNG  (MAX. 1080x1080px)</p>
                          </div>
                          <input id="dropzone-file" type="file" accept='.jpg,.png,.jpeg' className="hidden" />
                      </label>
                  </div>
              </div>}
          {previewImage && <div className='flex flex-col gap-3'> 
          <Image src={previewImage} height={300} width={300} alt='image' className='mx-auto rounded-full my-5'/></div>}
          </div>
          <form className="flex flex-col gap-2 justify-center mt-5">
              <label className="mx-auto w-1/2">Nom :</label>
              <Input required minLength={3} {...register("name")} className="mx-auto w-1/2" />
              <label className="mx-auto w-1/2" >Prix :</label>
              <Input required className='mx-auto w-1/2' {...register("price")} type='number' /> 
              <label className="mx-auto w-1/2">Description :</label>
              <Textarea className='mx-auto w-1/2' {...register("description")}/> 
              <div className="mx-auto w-1/2 gap-4"></div>
              <div className="mx-auto w-1/2">
                  <Button type={"button"} onClick={() => {
                    Swal.fire({
                      title:"Ajouter une image",
                      input:"file",
                      inputAttributes: {
                        accept:".png,.jpg,.jpeg"
                      } ,
                      showCancelButton:true,
                      confirmButtonText:"Ajouter",
                      cancelButtonText:"Annuler"
                    }).then((res:any) => {
                      if(res.isConfirmed){
                        let form = new FormData()
                        form.append("file", res.value)
                        var previewImage = URL.createObjectURL(res.value)
                        setPreviewImages([...previewImages, previewImage])
                        axios.post("/api/upload" , form).then((res:any) => {
                          let newImg = res.data.URL
                          setUploadedImages((prev) => [...prev, newImg])
                          
                        })
                      }  
                    })
                  }} > Ajouter d'autres images </Button>
              </div>
             
              {previewImages.length > 0 && (
  <Slider slidesToShow={1} infinite className="w-1/2 mx-auto   my-5">
    {previewImages.map((img, index) => (
   <div key={index} className="mx-auto">
   <div  className="mx-auto relative w-full max-w-md bg-white">
     <div className="absolute top-2 right-2 z-10">
       <DropdownMenu>
         <DropdownMenuTrigger>
           <Button className="font-bold" variant={"outline"}>...</Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
           <DropdownMenuLabel>Modifier l'image</DropdownMenuLabel>
           <DropdownMenuSeparator />
         {/*   <DropdownMenuItem onClick={() => {
             Swal.fire({
               title: "Sélectionner une image",
               input: "file",
               inputAttributes: {
                 accept: ".png,.jpg,.jpeg"
               },
             }).then((res) => {
               if (res.isConfirmed && res.value) {
                 let form = new FormData();
                 form.append("file", res.value);
                 var previewImage = URL.createObjectURL(res.value);
 
                 axios.post("/api/upload", form).then((res) => {
                   let newImg = res.data.URL;
                   let indexOfImg = previewImages.indexOf(p);
 
                   let newImagesPreview = [...previewImages];
                   newImagesPreview[indexOfImg] = previewImage;
 
                   if (product) {
                     let newImages = [...product.otherImagesUrl];
                     newImages[indexOfImg] = newImg;
 
                     setProduct({ ...product, otherImagesUrl: newImages });
                   }
                   setPreviewImages(newImagesPreview);
                 });
               }
             });
           }}>
             Remplacer
           </DropdownMenuItem> */}
           <DropdownMenuItem onClick={() => {
             Swal.fire({
               title: "Sélectionner une image",
               input: "file",
               inputAttributes: {
                 accept: ".png,.jpg,.jpeg"
               },
               denyButtonText: "Annuler",
               confirmButtonText: "Ajouter",
               showCancelButton: true
             }).then((res) => {
               if (res.isConfirmed && res.value) {
                 let file = res.value;
                 let form = new FormData();
                 form.append("file", file);
                 axios.post("/api/upload", form).then((res) => {
                   let newImg = res.data.URL;
                   let previewImage = URL.createObjectURL(file);
                  // setProduct({ ...product, otherImagesUrl: [...product.otherImagesUrl, newImg] });
                   setPreviewImages([...previewImages, previewImage]);
                 });
               }
             });
           }}>
             Ajouter une image
           </DropdownMenuItem>
           <DropdownMenuItem onClick={() => {
             Swal.fire({
               title: 'Êtes-vous sûr?',
               text: "Voulez-vous vraiment supprimer cette image?",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Oui, supprimez-le!',
               cancelButtonText: "Annuler"
             }).then((result) => {
               if (result.isConfirmed) {
                 setPreviewImages(previewImages.filter((p) => p !== img));
               //  setProduct({ ...product, otherImagesUrl: product.otherImagesUrl.filter((img) => img !== p) });
                 Swal.fire('Supprimé!', 'L\'image a été supprimée.', 'success');
               }
             });
           }}>
             Supprimer
           </DropdownMenuItem>
         </DropdownMenuContent>
       </DropdownMenu>
     </div>
     <div className="flex flex-col items-center">
       <Image
         className="w-full h-full rounded-lg shadow-lg my-0"
         src={img}
         width={200}
         height={200}
         alt="Full image"
       />
     </div>
   </div>
 </div>
 
    ))}
  </Slider>
)}

            
              <div className="flex mx-auto w-1/2 my-12">
                  <Button className="mx-auto bg-green-500" type='submit' variant={"default"}>Enregistrer</Button>
              </div>
          </form>
      </div>
  );
  
};
 