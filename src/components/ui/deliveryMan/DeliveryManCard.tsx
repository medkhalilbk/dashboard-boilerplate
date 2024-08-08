import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';
import AvatarComp from '../avatar';
import { EditIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../button';
import { IDeliveryMan } from '@/types/deliveryMan';
import { MobileIcon } from '@radix-ui/react-icons';

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
    } = userInfo;

    const description = `Email: ${email} | Statut Social: ${socialStatus} | Orders Completed: ${ordersCompleted}`;

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
                            <EyeIcon onClick={() => router.push(`/dashboard/company-details/${id}`)} />
                        </Button>
                        <Button variant={"ghost"}>
                            <EditIcon />
                        </Button>
                        <Button variant={"destructive"}>
                            <TrashIcon />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription>{description}</CardDescription>
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
