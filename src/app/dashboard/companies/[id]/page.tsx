"use client"
import DashboardLayout from '@/components/dashboardUILayout';
import { ICompany } from '@/types/company';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import { Button } from '@/components/ui/button';
import { ArrowLeftCircle, PrinterIcon } from 'lucide-react';
import { GoogleMap, Marker } from "@react-google-maps/api";
import { MapProvider } from '@/components/MapProvider';


const Page = () => {
    var settings = {
        dots: true,
        infinite: true, 
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode:true,
      };
        const defaultMapContainerStyle = {
        width: '100%',
        height: '80vh',
        borderRadius: '15px 0px 0px 15px',
    };
    const params = useParams<{ id: string }>();
    const [company, setCompany] = React.useState<ICompany | null>(null);

    React.useEffect(() => {
        if (params?.id) {
            axios.get(`/api/companies/${params.id}`)
                .then((response) => { 
                    setCompany(response.data.data as ICompany);
                })
                .catch((error) => {
                    console.error("Error fetching company data", error);
                });
        }
    }, [params?.id]);

    React.useEffect(() => {

    } , [company])
    return (
        <div>
   <DashboardLayout>
        <div className="flex row justify-between">
        <Button variant={"destructive"} onClick={() => { 
        window.history.back();
    }}><ArrowLeftCircle/>  </Button>
            <Button variant={"ghost"} onClick={() => { 
      
    }}> {/* <PrinterIcon/>  */} </Button>
        </div>
   {company &&   <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Détail de l'entreprise</h1>
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Nom : {company?.name}</h2>
            <p className="text-gray-700"><span className="font-medium">Description :</span> {company?.description}</p>
            <p className="text-gray-700"><span className="font-medium">Image Principale  :</span> </p>
            <Image src={company?.mainImage || ""} alt={company?.name || " image principale "} width={200} height={200} />
            <p className="text-gray-700"><span className="font-medium">Spécialité :</span> {company?.specialty}</p>
            <p className="text-gray-700"><span className="font-medium">Numéro de téléphone :</span> {company?.phoneNumber}</p>
            <p className="text-gray-700"><span className="font-medium">Distance de disponibilité :</span> {company?.availabilityDistance}</p>
            <p className="text-gray-700"><span className="font-medium">Heures de travail :</span> {company?.workHours?.start} - {company?.workHours?.end}</p>
            <p className="text-gray-700"><span className="font-medium">Autre Images :</span> </p>
            <Slider {...settings} className='my-2'>
                {company?.otherImages?.map((img, index) => (
                    <div key={index} className='flex justify-center'>
                        <Image style={{margin:"auto"}} src={img} alt={`image ${index}`} width={500} height={200} />
                    </div>))}
    </Slider>
    <p className="text-gray-700"><span className="font-medium">Mots-clés :</span> {(company?.keywords as string[]).join(" ")}</p>

                    
            <h2 className="text-xl font-semibold">Localisation  👇 </h2>
                    {company?.location && <MapProvider>
                    <GoogleMap
                        options={{
                            zoomControl: true,
                            tilt: 0,
                            gestureHandling: 'auto',
                            mapTypeId: "roadmap",
                        }}
                        zoom={18}
                        center={{ lat:company.location.latitude,lng:company.location.longitude }}
                        mapContainerStyle={defaultMapContainerStyle}
                    >
                        <Marker position={{ lat:company.location.latitude,lng:company.location.longitude}} />
                    </GoogleMap>
                    </MapProvider>}
        </div>
    </div>}
</DashboardLayout>

        </div>
    );
};

export default Page;
