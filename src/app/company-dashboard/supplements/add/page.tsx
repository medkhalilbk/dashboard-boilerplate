"use client"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
export default function addSupplementPage(){
    const { handleSubmit, control,setValue, register, formState: { errors } , getValues } = useForm({
        defaultValues: {
            name: "",
            price: 0,
            image: null
        }
    });
    const onSubmit = async () => {
       try {
        event?.preventDefault();
        let data = getValues()
        if(typeof window !== "undefined"){
            let id = localStorage.getItem("id") as string;
            let formData = new FormData();
            formData.append('name', data.name);
            formData.append('price', (data.price as number).toString());
            formData.append('image', file as File); 
            formData.append("companyId" , id)
            let response = await fetch('/api/supplements', {
                method: 'POST',
                body: formData
            });
            let json = await response.json();
            if (response.ok) {
                Swal.fire({
                    title:"Supplement ajouté avec succès",
                    icon: "success"
                })
            } else {
                Swal.fire({
                    title:"Erreur lors de l'ajout du supplement",
                    icon: "error"
                })
            }
        }
       } catch (error) {
        
       }

      }
    const [previewImage,setPreviewImage] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null); 
    const [showDropZone, setShowDropZone] = useState(false);
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setPreviewImage(URL.createObjectURL(file));
            setFile(file);
        }
    };
    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
    };

    return <div>
        <h1 className="font-bold text-2xl text-center">Ajouter un supplement</h1>
        {previewImage && <div className='flex flex-col gap-3'> 
        
          <Image  src={previewImage} height={300} width={300} alt='image' className='mx-auto rounded-full my-5'/></div>}
          <div className='flex flex-row justify-center my-2'>
                      <Button className="mx-auto" onClick={() => {
                        setShowDropZone(!showDropZone)
                      }}>Choisir l'image</Button>
                  </div>
        <form className="w-2/3 mx-auto flex flex-col gap-3" onSubmit={onSubmit}>
            <div >
                <label htmlFor="name">Nom :</label>
                <Input {...register("name")} type="text" name="name" id="name" />
            </div>
            <div>
                <label htmlFor="price">Prix :</label>
                <Input {...register("price")}  type="number" name="price" id="price" />
            </div>
            {showDropZone &&  <div>
                <label htmlFor="description">Ajouter une image</label> 
                <div className="mx-auto w-1/2">
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
              </div>
            </div>}
                <Button type="submit" className="w-1/2 mx-auto my-5">Ajouter</Button>
            </form>
    </div>
}