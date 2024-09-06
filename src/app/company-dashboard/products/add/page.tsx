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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { useRouter } from 'next/navigation';
export default function AddProduct() {

    const router = useRouter()
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
    const [menus, setMenus] = useState([])
    const [id, setId] = useState<string | null>(null)
    const [menuId, setMenuId] = useState<string | null>(null)
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
      if(file){
        formData.append("file", file)
      }else{
        return Swal.fire("Erreur", "Veuillez ajouter une image principale", "error")
      }

      // upload main image
      let mainImage = await axios.post("/api/upload", formData)
      console.log(mainImage)
      data.mainImageUrl = mainImage.data.URL
      data.otherImages = uploadedImages
      data.companyId = id
      data.menuId = menuId
      data.price = parseFloat(data.price)
      
      
        axios.post("/api/products", data).then((res) => {
          Swal.fire("Succès", "Produit ajouté avec succès", "success").then((res) => {
            if(res.isConfirmed){
              router.push("/company-dashboard/products")
            }
          })
        }).catch((err:any) => {
          console.log(err)
          Swal.fire("Erreur", "Une erreur s'est produite", "error")
        })
    
     
      
    }
 
    React.useEffect(() => {
      if(typeof window !== "undefined"){
        let id = localStorage.getItem("id")
        setId(id)
        axios.get("/api/companies/" + id + "/menus").then((res) => {
          if(res.data.data.menus?.length > 0){
            setMenus(res.data.data.menus)
          }
        })
      }
    }, [])
    
    return (
      <div>
          <h1 className='font-bold text-2xl text-center'>Ajouter un produit</h1> 
          <div className="block my-2">
              <div className="w-full"> 
                  <div className='flex flex-row justify-center my-2'>
                      <Button className="mx-auto" onClick={() => {
                        setShowDropZone(!showDropZone)
                      }}>Choisir l&apos;image</Button>
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
          <form className="flex flex-col gap-2 justify-center mt-5" onSubmit={onSubmit}>
              <label className="mx-auto w-1/2">Nom :</label>
              <Input required minLength={3} {...register("name")} className="mx-auto w-1/2" />
              <label className="mx-auto w-1/2" >Prix :</label>
              <Input step={0.1} required className='mx-auto w-1/2' {...register("price")} type='number' /> 
              <label className="mx-auto w-1/2">Description :</label>
              <Textarea className='mx-auto w-1/2' {...register("description")}/> 
              <div className="mx-auto w-1/2 gap-4">
                <label className="mx-auto">En stock :</label>
                <input required className="mx-auto ml-4" type="checkbox" {...register("inStock")} />
              </div>
              <div className='mx-auto w-1/2 gap-4 my-3'>
            {menus.length > 0 && 
              <Select onValueChange={(value:string) => {
                setMenuId(value)
              }} >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir un menu" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Menus</SelectLabel>
                  {menus.map((m:any) => {
                    return <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                  })}  
                </SelectGroup>
              </SelectContent>
            </Select>}
              </div>
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
                      confirmButtonColor:"#22C55E", 
                      cancelButtonColor:"#d33",
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
                  }} > Ajouter d&apos;autres images </Button>
              </div> 
              {previewImages.length > 0 && (
  <Slider adaptiveHeight slidesToShow={1} infinite className="w-1/2 mx-auto   my-5">
    {previewImages.map((img, index) => (
   <div key={index} className="mx-auto">
   <div  className="mx-auto relative w-full max-w-md bg-white">
     <div className="absolute top-2 right-2 z-10">
       <DropdownMenu>
         <DropdownMenuTrigger>
           <Button className="font-bold" variant={"outline"}>...</Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
           <DropdownMenuLabel>Modifier l&apos;image</DropdownMenuLabel>
           <DropdownMenuSeparator />
    
           <DropdownMenuItem onClick={() => {
             Swal.fire({
               title: 'Êtes-vous sûr?',
               text: "Voulez-vous vraiment supprimer cette image?",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: 'black',
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
 