import { useRouter } from "next/navigation";
import { Dispatch, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "../button";
import { TrashIcon, EditIcon } from "lucide-react"; 

const UpdateImages: React.FC<{ imgs: string[] | undefined, setCompany: Dispatch<any> }> = ({ imgs, setCompany }) => {
  const [imagesArray, setImagesArray] = useState<string[]>(imgs || []);
  const [uploadedImages, setUploadedImages] = useState<string[]>(imgs || []);
  const router = useRouter();
   useEffect(() => {
     console.log(uploadedImages)
  }, [uploadedImages])
 

  const deleteImage = (index: number) => {
    Swal.fire({
      title: 'Vou voulez supprimer cette image?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText:"Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedImages = imagesArray.filter((_, i) => i !== index);
        setImagesArray(updatedImages);
        setUploadedImages(uploadedImages.filter((_, i) => i !== index));
        let newUploadedImages = uploadedImages.filter((_, i) => i !== index);
        setCompany((prev: any) => ({ ...prev, otherImages: newUploadedImages }));
        Swal.fire('Image supprimé!', 'Votre image a été supprimé', 'success');
      }
    });
  };

  const replaceImage = (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const updatedImages = [...imagesArray];
        updatedImages[index] = reader.result as string;
        setImagesArray(updatedImages); 
        const formData = new FormData();
        formData.append("file", file);
        try {
            let response = await fetch("/api/upload" , {
                method:"POST",
                body:formData
            })
            if(response.ok){
                let body = await response.json();
                const newUploadedImages = [...uploadedImages]
                newUploadedImages[index] = body.URL;
                setUploadedImages(newUploadedImages);
                setCompany((prev: any) => ({ ...prev, otherImages: newUploadedImages })); 
            }
                
        } catch (error) {
            console.log(error)
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };
  const PlusIcon = () => {
    return (
      <svg
        width="380px"
        height="380px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" fill="none" width="24" height="24" />
        <g>
          <path fill="#23A049" d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z" />
        </g>
      </svg>
    );
  };
    function addImage() { 
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: any) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = async () => {
                const updatedImages = [...imagesArray];
                updatedImages.push(reader.result as string);
                setImagesArray(updatedImages);
                const formData = new FormData();
                formData.append("file", file);
                try {
                    let response = await fetch("/api/upload" , {
                        method:"POST",
                        body:formData
                    })
                    if(response.ok){
                        let body = await response.json();
                        setUploadedImages((prev) => [...prev, body.URL]);
                        let arr = [...uploadedImages, body.URL];
                        setCompany((prev: any) => ({ ...prev, otherImages: arr }));
                        console.log(body.URL)
                    }
                        
                } catch (error) {
                    console.log(error)
                }
                 
            };
            reader.readAsDataURL(file);
          };
          input.click();
    }

  return (
    <><div className="grid grid-cols-4 gap-4 w-2/3 mx-auto mt-5">
      {imagesArray.map((img, index) => (
        <div key={index} className="relative">
          <img src={img} alt={`image-${index}`} className="w-full h-auto rounded-lg"/>
          <Button className="absolute top-0 left-0 transform -translate-y-1/2 bg-gray-700 text-white" onClick={() => replaceImage(index)}>
            <EditIcon className="w-4 h-4" />
          </Button>
          <Button  className="absolute top-0 right-0 transform -translate-y-1/2 bg-red-500 text-white" onClick={() => deleteImage(index)}>
            <TrashIcon className="w-4 h-4" />
          </Button> 
        </div>
      ))}

      <Button variant={"outline"} style={{
        height:400
      }} onClick={() => {
        addImage()
      }} >
        <PlusIcon/> 
      </Button> 
    </div>
    </>
    
  );
};

export default UpdateImages;
