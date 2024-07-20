import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';
import { MobileIcon } from '@radix-ui/react-icons';
import AvatarComp from '../avatar';
import { Button } from '../button';
import { EditIcon, EyeIcon, TrashIcon } from 'lucide-react';

interface CompanyCardProps {
    name: string;
    description: string;
    speciality: string;
    mainImage: string;
    keywords?: string[];
    phoneNumber?: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name, description, speciality, mainImage, keywords, phoneNumber }) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <AvatarComp img={mainImage} />
                        <CardTitle>{name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2"> 
                    <Button variant={"default"}>  
                    <EyeIcon/>
                    </Button>
                    <Button variant={"ghost"}>  
                    <EditIcon/>
                    </Button>
                    <Button variant={"destructive"}>  
                    <TrashIcon/>
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

export default CompanyCard;
