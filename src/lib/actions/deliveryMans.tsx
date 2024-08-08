import axios from "axios"

export async function uploadFilesForDeliveryMan({ userId,deliveryManId ,image, pdf }: { userId: string,deliveryManId:string, image: File, pdf: File }) {
     try {
        let uploadPromises = [ uploadImageRequest(image), uploadContractRequest(pdf)] 
        let uploadLinks = await Promise.all(uploadPromises) 
        const uploadedFiles = {imageUrl:uploadLinks[0],contractFile:uploadLinks[1]}
        let updateDeliveryInformations = axios.patch("/api/deliveryMans/"+deliveryManId,{
            contractFile:uploadedFiles.contractFile,
        })
       let updateUserImage = axios.patch("/api/users/" + userId, {
        imgUrl:uploadedFiles.imageUrl
       })
       let updatedData = await Promise.all([updateDeliveryInformations,updateUserImage])
       return updatedData
     } catch (error) {
        console.log(error)
        throw error
     }
}
async  function uploadImageRequest(image: File) {
  try {
    let form =  new FormData()
    form.append("file",image)
    const response = await fetch("/api/upload", {
        method: "POST",
        body: form, })
    if(response.ok) {
        let body = await response.json()
     return body.URL
    }
  } catch (error) {
    throw error
  }
}

async function uploadContractRequest(pdf: File) {
    try {
        let form = new FormData()
        form.append("file" , pdf) 
        const response = await fetch("/api/upload" , {
            method:"POST",
            body:form })

        if(response.ok) {
            let body = await response.json()
            return body.URL
        }
    } catch (error) {
        throw error
    }
}
 