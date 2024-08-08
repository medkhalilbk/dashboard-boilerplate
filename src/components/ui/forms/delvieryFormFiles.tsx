import React, { useState } from 'react';
import { Input } from '../input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '../button';
import Image from 'next/image';
import { uploadFilesForDeliveryMan } from '@/lib/actions/deliveryMans';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
const DeliveryFormFiles: React.FC<{userId:string,deliveryManId:string}> = ({userId,deliveryManId}) => {
    const [image, setImage] = useState<File | null>(null);
    const [pdf, setPdf] = useState<File | null>(null);
    const [errors, setErrors] = useState<any>(null) 
    const router = useRouter()
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPdf(e.target.files[0]);
        }
    };
 

    return (
        <Card className="space-y-4 p-6 mt-5">
       
            <CardHeader>
                <CardTitle>Télécharger des fichiers</CardTitle>
                <CardDescription>Veuillez télécharger les fichiers requis ci-dessous.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
            
                    {image && (
                        <div className="mb-4">
                            <Image
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="w-100 h-auto rounded-md mx-auto"
                                width={100}
                                height={199}
                            />
                        </div>
                    )}
                    <Input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <div>
                    <label htmlFor="pdf" className="block text-sm font-medium">
                        Contrat au format PDF :
                    </label>
                    <Input
                        type="file"
                        id="pdf"
                        accept=".pdf"
                        onChange={handlePdfChange}
                    />
                </div>
            </CardContent>
            <CardFooter className='mx-auto'>
                <Button  onClick={() => { 
                   if(image && pdf) {
                    uploadFilesForDeliveryMan({userId,deliveryManId,image,pdf}).then((res:any) => {
                         Swal.fire({
                            title:"Informations ajoutés",
                            text:"Les fichiers sont ajoutés à la base de données",
                            confirmButtonText:"Terminer" ,
                         }).then(() => {
                            router.push('/dashboard/delivery-mans')
                         })
                    }).catch((err) => { 
                    })
                   }
                    
                }} className='mx-auto' disabled={!(image && pdf)} >Télécharger</Button>
            </CardFooter>
        </Card>
    );
};

export default DeliveryFormFiles;
