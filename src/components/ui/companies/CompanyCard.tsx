import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';
import { MobileIcon } from '@radix-ui/react-icons';
import AvatarComp from '../avatar';
import { Button } from '../button';
import { EditIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UseDispatch, useDispatch } from 'react-redux';
import { deleteCompany } from '@/lib/features/companySlice';
import Swal from 'sweetalert2';
interface CompanyCardProps {
    id:string,
    name: string;
    description: string;
    speciality: string;
    mainImage: string;
    keywords?: string[];
    phoneNumber?: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ id,name, description, speciality, mainImage, keywords, phoneNumber }) => {
const router = useRouter()
const dispatch = useDispatch()

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <AvatarComp img={mainImage} />
                        <CardTitle style={{marginLeft:10}}>{name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2"> 
                    <Button onClick={() => {
                        router.push(`/dashboard/companies/${id}`)
                    }} variant={"default"}>  
                    <EyeIcon />
                    </Button>
                    <Button variant={"ghost"} onClick={() => {
                      router.push(`/dashboard/edit-company/${id}`)
                    }} >  
                    <EditIcon/>
                    </Button>
                    <Button variant={"destructive"} onClick={() => {
                      Swal.fire({
                        title: 'Êtes-vous sûr?',
                        text: "Vous ne pourrez pas revenir en arrière!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Oui, supprimez-le!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                            axios.delete(`/api/companies/${id}`).then(() => {
                                dispatch(deleteCompany({id}))
                            })
                          .then((response) => {
                            dispatch(deleteCompany({id}))
                            Swal.fire(
                              'Supprimé!',
                              'Votre entreprise a été supprimée.',
                              'success'
                            )
                          })
                          .catch((error) => {
                            Swal.fire(
                              'Erreur!',
                              'Une erreur s\'est produite lors de la suppression.',
                              'error'
                            )
                          })
                        }
                      })
                    }} >  
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
