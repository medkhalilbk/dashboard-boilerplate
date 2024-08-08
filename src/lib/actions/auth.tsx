import axios from "axios";
interface DeliveryManData {
    fullName: string;
    phoneNumber: string;
    socialStatus: string;
    cin: string;
    isActive: boolean;
}

interface User {
    name: string;
    email: string;
    password: string;
    role: string;
    isEmailVerified: boolean;
    imgUrl: string;
    deliveryManData: DeliveryManData;
}

export function loginAction(user: { email: string; password: string; }) { 
return axios.post('/api/auth', user)
}
export async function createDeliveryManAccount(userInformation: User) {

    try {
        let createUser = await axios.post("/api/users",{
            name: userInformation.name,
            email: userInformation.email,
            password:   userInformation.password,
            role:"deliveryMan",
            isEmailVerified: userInformation.isEmailVerified,
        } ) 
        let {id} = createUser.data.data
        console.log("id" , id)
        let createDeliveryMan = await axios.post("/api/deliveryMans",{
            deliveryManData:{
            fullName: userInformation.name,
            phoneNumber: userInformation.deliveryManData.phoneNumber,
            socialStatus: userInformation.deliveryManData.socialStatus,
            cin: userInformation.deliveryManData.cin,
            isActive: userInformation.deliveryManData.isActive,  
            },
            userId: id
        })
        return createDeliveryMan.data
    } catch (error:any) {
        throw error
    }
}