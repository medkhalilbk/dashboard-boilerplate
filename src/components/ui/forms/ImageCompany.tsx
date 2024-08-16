"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {Input} from '../input'
import React, { useState } from 'react';
import { useRef } from "react";
import { Button } from "../button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCompany } from "@/lib/features/companySlice";
import { ICompany } from "@/types/company";
import Swal from "sweetalert2";
const MainImageUploader: React.FC<{ uploadAction: (url: Object) => void, setStep:any }> = ({ uploadAction,setStep }) => {
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [otherImages, setOtherImages] = useState<File[]>([]);
	const [otherImagesUploadSuccess, setOtherImagesUploadSuccess] = useState<string[]>([]);
	const [otherImagesUploadError, setOtherImagesUploadError] = useState<string[]>([]);
  
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  const file = event.target.files?.[0];
	  if (file) {
		setSelectedImage(file);
	  }
	};
  
	const handleOtherImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  const files = event.target.files;
	  if (files) {
		setOtherImages(Array.from(files));
	  }
	};
  
	const handleUpload = async () => {
	  if (selectedImage) {
		await uploadMainImage();
	  }
	  if (otherImages.length > 0) {
		await uploadOtherImages();
	  }
	  Swal.fire({
		title: "Images telechargées",
		icon: "success", 
	  }).then(() => {
		setSelectedImage(null);
		setOtherImages([]);
		setOtherImagesUploadSuccess([]);
		setOtherImagesUploadError([]);
		setStep(3)
	  })
	};
  
	const uploadMainImage = async () => {
	  if (!selectedImage) {
		setUploadError("No image selected");
		return;
	  }
	  setUploading(true);
	  setUploadSuccess(false);
	  setUploadError(null);
	  const formData = new FormData();
	  formData.append("file", selectedImage);
	  try {
		const response = await fetch("/api/upload", {
		  method: "POST",
		  body: formData,
		});
  
		if (response.ok) {
		  setUploadSuccess(true);
		  setSelectedImage(null);
		  const body = await response.json();
		  uploadAction({mainImage: body.URL});
		} else {
		  const errorData = await response.json();
		  setUploadError(errorData.message || "Upload failed");
		}
	  } catch (error) {
		setUploadError("Upload failed. Please try again.");
	  } finally {
		setUploading(false);
	  }
	};
  
	const uploadOtherImages = async () => {
	  if (!otherImages.length) {
		setUploadError("No images selected");
		return;
	  }
	  setUploading(true);
	  setOtherImagesUploadSuccess([]);
	  setOtherImagesUploadError([]);
  
	  const uploadPromises = otherImages.map(async (image) => {
		const formData = new FormData();
		formData.append("file", image);
		try {
		  const response = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		  });
  
		  if (response.ok) {
			const body = await response.json();
			setOtherImagesUploadSuccess((prev) => [...prev, body.URL]);
			return body.URL;
		  } else {
			const errorData = await response.json();
			setOtherImagesUploadError((prev) => [...prev, errorData.message || "Upload failed"]);
		  }
		} catch (error) {
		  setOtherImagesUploadError((prev) => [...prev, "Upload failed. Please try again."]);
		}
	  });
  
	  let results = await Promise.all(uploadPromises);
	  uploadAction((prev:any) => ({ ...prev, otherImages: results }));
	  setUploading(false); 
	};
  
	return (
	  <div className='flex flex-col space-y-8'>
		<Input type="file" accept="image/*" onChange={handleImageChange} />
		{selectedImage && (
		  <div className='mx-auto'>
			<img className='rounded-full' width={300} src={URL.createObjectURL(selectedImage)} alt="Selected" />
			<p className='my-8'>Main Image: {selectedImage.name}</p>
		  </div>
		)}
		
		<h2 className='my-3'>Ajouter les autres images: </h2>
		<Input type="file" accept="image/*" multiple onChange={handleOtherImagesChange} />
		{otherImages.length > 0 && (
		  <div className='flex flex-wrap gap-4 mx-auto'>
			{otherImages.map((image, index) => (
			  <div key={index}>
				<img className='rounded' width={100} src={URL.createObjectURL(image)} alt={`Other ${index}`} />
				<p className='my-4'>{image.name}</p>
			  </div>
			))}
		  </div>
		)}

		<Button onClick={handleUpload} disabled={uploading || (!selectedImage || !otherImages)}>
		  {uploading ? "En cours..." : "Telecharger les images"}
		</Button> 
  
		 
		{otherImagesUploadError.length > 0 && (
		  <div className="text-red-500">
			<p>Some other images failed to upload:</p>
			{otherImagesUploadError.map((error, index) => (
			  <p key={index}>{error}</p>
			))}
		  </div>
		)}
	  </div>
	);
  };
 


 

export default function ImageCompany({ companyId,setStep }: { companyId: string,setStep: (step: number) => void }) {
    const [imagesObject, setImagesObject] = useState<Object| null>(null); 
	const dispatch = useDispatch()

	React.useEffect(() => {

		async function uploadImages(imagesObject: Object, companyId: string) {
			try {
				let {data} = await axios.patch('/api/companies/' + companyId, imagesObject)
				return data
			} catch (error) {
			 return error
			}
		}

	 if (imagesObject) {
		 uploadImages(imagesObject, companyId).then((res:ICompany) => {
			 dispatch(updateCompany(res))
		 }).catch((err) => {
			 
		 })
	 }
	} , [imagesObject])
    return (
        <div className='flex flex-col'>  
            <h2 className='my-3'>Ajouter une image principale </h2>
            <MainImageUploader uploadAction={setImagesObject} setStep={setStep} />
        </div>
    );
}

 
