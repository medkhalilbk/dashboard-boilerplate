import axios from "axios";

export async function notificationUser({
    token,
    body,
    title
  }: {
    token: string | null | undefined;
    body: string;
    title: string;
  }) {
    if(!token){
        return false
    } 
    let url = process.env.BASE_URL + ":1000/send-notification";
    const data = {
        token: token,
        title: title,
        body: body,
    };
    try {
        const response = await axios.post(url, data , {
            headers:{
                "x-api-key": process.env.PRIVATE_KEY
            }
        });
        console.log(response.data);
        return true 
    } catch (error: any) {
        console.error(error.message);
        return false 
    } 
}