import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';
import AvatarComp from '../avatar';
import { EditIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../button';
import { IDeliveryMan } from '@/types/DeliveryMan';
import { MobileIcon } from '@radix-ui/react-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteDeliveryMan } from '@/lib/features/deliveryManSlice';

interface DeliverymanCardProps {
    deliveryman: IDeliveryMan;
}

const DeliverymanCard: React.FC<DeliverymanCardProps> = ({ deliveryman }) => {
    const router = useRouter();

    const {
        id,
        fullName,
        phoneNumber,
        socialStatus,
        ordersCompleted,
        vehiculeSerialNumber,
        cin,
        isActive,
        contractFile,
        userInfo
    } = deliveryman;

    const { 
        name,
        email,
        password,
        role,
        isEmailVerified,
        createdAt,
        updatedAt,
        companyId,
        deliveryManId,
        imgUrl,
        isDeleted
    } = userInfo || {};

    const dispatch = useDispatch()
    return (  
        <Card className='my-4'>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <AvatarComp img={imgUrl} />
                        <CardTitle style={{ marginLeft: 10 }}>{fullName}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant={"default"}>
                            <EyeIcon onClick={() => {
                                if(!userInfo){
                                  return  Swal.fire({
                                        title:"Erreur lors de la redirection",
                                        text:"L'id de l'utilisateur n'est pas défini",
                                        icon:"error",
                                    })
                                }    
                                router.push(`/dashboard/delivery-mans/${userInfo.id}`) 
                                }} />
                        </Button>
                        <Button variant={"ghost"} onClick={() => {
                            router.push("/dashboard/edit-delivery-man/"+userInfo.id)
                        }} >
                            <EditIcon />
                        </Button>
                        <Button variant={"destructive"} onClick={() => {
                            Swal.fire({
                                title:"Vouz voulez vraiement supprimer ce livreur?",
                                icon:"warning",
                                showCancelButton:true,
                                confirmButtonText:"Oui",
                            }).then((response) => {
                                if(response.isConfirmed){
                                    axios.delete(`/api/deliveryMans/${id}`).then(() => {
                                        Swal.fire({
                                            title:"Livreur supprimé avec succès",
                                            icon:"success",
                                        })
                                        dispatch(deleteDeliveryMan({id}))
                                    }).catch((err) => {
                                        Swal.fire({
                                            title:"Erreur lors de la suppression",
                                            text:err.response.data.message,
                                            icon:"error",
                                        })
                                    })
                                }
                            })
                        }} >
                            <TrashIcon />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>  
            </CardContent>
            <CardFooter>
                <CardDescription>
                    <div className="flex items-center text-lg">
                        <MobileIcon className="h-6 w-6 mr-2 text-green-600" />
                        {phoneNumber}
                    </div>
                </CardDescription>
            </CardFooter>
        </Card>
    );
};

export default DeliverymanCard;
