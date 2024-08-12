"use client"
import DashboardLayout from '@/components/dashboardUILayout';
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ICompany, IDay } from '@/types/company';
import axios from 'axios'; 
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea'; 
import { Slider } from '@/components/ui/slider';
import { getLongAndLatFromUrl, getUrlFromLongAndLat } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card'; 
import { Button } from '@/components/ui/button';
import { EditIcon, TrashIcon } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import Swal from 'sweetalert2';  
import { MapProvider } from '@/components/MapProvider';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Spinner } from '@/components/ui/spinner';
const Page: React.FC = () => {
    const { id } = useParams() as { id: string };
    const [days,setDays] = useState<string[]>([])
    const [company, setCompany] = useState<ICompany>();
    const [updatedCompany,setUpdatedCompany] = useState<any>()
    const [keywordText,setKeywordText] = useState('')
    const [keywordsArray, setKeywordsArray] = useState<string[]>([]) 
    const [distance, setDistance] = useState(0)
    const [openingTime, setOpeningTime] = useState({ hours: 0, minutes: 0 })
    const [closingTime, setClosingTime] = useState({ hours: 0, minutes: 0 }) 
    const [location, setLocation] = useState<any>({longitude:0,latitude:0})
    const [errorUrl, seterrorUrl] = useState(false)
    const [dataIsSet,setDataIsSet] = useState(false)
    function extractHoursAndMinutes(timeString:string) {
        const [hours, minutes] = timeString.split(':');
        return { hours: parseInt(hours, 10), minutes: parseInt(minutes, 10) };
    }
    useEffect(() => {
        axios
            .get(`/api/companies/${id}`)
            .then((response) => {
                setCompany(response.data.data);
                setDistance(response.data.data.availabilityDistance)
                setLocation(response.data.data.location)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);


    
    React.useEffect(() => { 
        if(company){
            setValue('name', company.name)
            setValue("id",company.id)
            setValue('description', company.description)
            setValue("phoneNumber" , company.phoneNumber)
            setValue("availabilityDistance", company.availabilityDistance)
            setOpeningTime(extractHoursAndMinutes(company.workHours.start))
            setClosingTime(extractHoursAndMinutes(company.workHours.end))
            setValue("type", company.type)
            setValue("specialty", company.specialty)
            setValue("mainImage" , company.mainImage)
            setDays(company.days)
            setValue("keywords" , company.keywords)
            setKeywordText(company.keywords.join(" ")) 
            setKeywordsArray(company.keywords) 
            setValue("location" , getUrlFromLongAndLat(location))
        }
         
        
    },[company]) 
  
    const { handleSubmit, control,setValue, register, formState: { errors } , getValues } = useForm<ICompany | any>({
        defaultValues: {
          name: '',
          description: '',
          phoneNumber: '',
          location: "" ,
          availabilityDistance: 0,
          mainImage: '',
          otherImages: [],
          workHours:  {},
          days: [],
          type: 'Restaurant',
          specialty: '',
          Menu: [],
          keywords: []
        } 
      }); 
      useMemo(() => {
        setValue("days" , days)
      }, [days])
      const DataForm : React.FC = () => {
        return  <div> 
    <label className='my-2 '>Idendifiant unique : </label> 
    <Input disabled {...register('id', { required: true })} />
    <Card className='w-fit mx-auto my-2'>
    <CardHeader className='flex flex-row items-center justify-around'> 
    <h3>Image principale</h3>
    <Button onClick={() => {
      Swal.fire({
        title:"Remplacer l'image",
        input:"file",
        inputAttributes:{
          accept:"image/*"
        },
        showCancelButton:true,
        cancelButtonText:"Annuler",
        confirmButtonColor:"#009737",
        confirmButtonText:"Remplacer",
      }).then((result) => {
        if(result.isConfirmed){
          console.log(result.value)
          const formData = new FormData();
          formData.append("file",result.value)
          let image = URL.createObjectURL(result.value)
          fetch("/api/upload", {
            method: "POST",
            body: formData,
          }).then((response) => {
            if(response.ok){
              response.json().then((data) => { 
                setValue("mainImage",image)
                if(company){ 
                  setTimeout(() => { 
                  setCompany({...company,mainImage:data.URL})
                  }, 3000);
                }
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    }} size={"icon"} className='ml-auto' color='red'><EditIcon/></Button>
</CardHeader>
      <CardContent>
        <img className='mx-auto' src={getValues("mainImage") } width={400} height={400} alt='Image principale'/>
      </CardContent>
    </Card> 
     <label className='my-2 '>Nom : </label> 
    <Input {...register('name', { required: true })} />
    <label className='my-2 '>Description:</label>
    <Textarea {...register('description', { required: true })} /> 
    {errors.description && <span>Description is required</span>}
            <label className='my-2 '>Mots clé (utiliser ,  ou espace comme séparateur) :</label>
       <Input {...register("keywords")} /> 
    <label className='my-2 '>Telephone :</label>
    <Input {...register('phoneNumber', { required: true })} /> 
    <label className='my-2 '>Distance de disponibilité {distance} (KM):</label> 
    <Slider 
      className='mb-4'
      {...register('availabilityDistance')}
      min={0}
      max={100}
      value={[distance]}
      onValueChange={ (value) => {
        setDistance(value[0])
      }}
    />
    <label className='my-2 '>Heure d'ouverture : </label>
    <div className="flex row gap-x-3">
      <div className="flex flex-col"> 
        <label className='text-sm'>Heures</label>
        <Input 
          onInput={(input: React.FormEvent<HTMLInputElement>) => { 
            setOpeningTime({ hours: parseInt(input.currentTarget.value), minutes: openingTime.minutes })
          }} 
          value={openingTime.hours}
          type="number" 
          max={23} 
          min={0}
        />
      </div>
      <div className="flex flex-col"> 
        <label className='text-sm'>Minutes</label>
        <Input 
          onChange={(input: React.FormEvent<HTMLInputElement>) => { 
            setOpeningTime({ hours: openingTime.hours, minutes: parseInt(input.currentTarget.value) })
          }} 
          type="number" 
          max={59} 
          value={openingTime.minutes}
          min={0}
        />
      </div> 
    </div>
    <label className='my-2 '>Heure de fermeture : </label>
    <div className="flex row gap-x-3">
      <div className="flex flex-col"> 
        <label className='text-sm'> Heures</label>
        <Input 
          onChange={(input: React.FormEvent<HTMLInputElement>) => { 
            setClosingTime({ hours: parseInt(input.currentTarget.value), minutes: closingTime.minutes })
          }} 
          type="number" 
          max={23} 
          value={closingTime.hours}
          min={0}
        />
      </div>
      <div className="flex flex-col"> 
        <label className='text-sm'> Minutes</label>
        <Input 
          onChange={(input: React.FormEvent<HTMLInputElement>) => { 
            setClosingTime({ hours: closingTime.hours, minutes: parseInt(input.currentTarget.value) })
          }} 
          type="number" 
          max={59} 
          value={closingTime.minutes}
          min={0}
        />
      </div> 
    </div>

   {location && <>
    <label className='my-2 '>Localisation (Lien Google Maps):</label> 
    <Input {...register("location")} onInput={(input:React.FormEvent<HTMLInputElement>) => {
     let newLocation = getLongAndLatFromUrl(input.currentTarget.value)
    return setLocation(newLocation || location)
    }} type='text' />
    {errorUrl && <p className='text-red-600 my-2'>Erreur de lien </p>}</>}
<MapProvider>
<GoogleMap
                        options={{
                            zoomControl: true,
                            tilt: 0,
                            gestureHandling: 'auto',
                            mapTypeId: "roadmap",
                        }}
                        zoom={18}
                        center={{ lat:location.latitude,lng:location.longitude }}
                        mapContainerStyle={{
                          width: '100%',
                          height: '50vh',
                          borderRadius: '15px 0px 0px 15px',
                          marginTop:"2em",
                          marginBottom:"2em"
                        }}
                    >
                        <Marker position={{ lat:location.latitude,lng:location.longitude}} />
                    </GoogleMap>
</MapProvider>
<div>
    <label className='my-2 '>Type d'entreprise :</label>
    <div className="relative">
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select
          defaultValue={company?.type}
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
          >
            <SelectTrigger>
              {field.value ? field.value : 'Type'}
            </SelectTrigger>
            <SelectContent>
                
              <SelectItem value="Entreprise" disabled>Entreprise</SelectItem>
              <SelectItem  value="Restaurant">Restaurant</SelectItem>
              <SelectItem value="Café">Café</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  </div> 
  <div>
<label className='my-2 '>Specialité :</label>
<div className="relative my-2">
<Controller
  name="specialty"
  control={control}
  render={({ field }) => (
    <Select
      value={field.value || ""}
      onValueChange={(value) => field.onChange(value)}
    >
      <SelectTrigger>
        {field.value ? field.value : 'Specialité'}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Restaurant Tunisien">Restaurant Tunisien</SelectItem>
        <SelectItem value="Restaurant Méditerranéen">Restaurant Méditerranéen</SelectItem>
        <SelectItem value="Restaurant Italien">Restaurant Italien</SelectItem>
        <SelectItem value="Restaurant Oriental">Restaurant Oriental</SelectItem>
        <SelectItem value="Autre">Autre</SelectItem>
      </SelectContent>
    </Select>
    
    
  )}
/> 
<div className='my-2'>
{Object.values(IDay).map(day => (
          <label key={day}>
            <p className='capitalize'>
              <Checkbox checked={days.includes(day)} onClick={() => { 
                console.log(days)
                if(days.includes(day)){
                  setDays(days.filter((d) => d !== day))}
                else{
                  setDays([...days,day])
                }
              }}  value={day} className='mr-2'  />
              {day}
            </p>
          </label>
        ))}
</div>
</div> 

</div> 
<div className="flex justify-center">
<Button type='submit' className='flex justify-center' size={"lg"} onClick={handleSubmit((data) => {
  setUpdatedCompany({...data,workHours:{start:`${openingTime.hours}:${openingTime.minutes}`,end:`${closingTime.hours}:${closingTime.minutes}`},location:location})
  setDataIsSet(true)
})}> Suivant </Button> 
</div> 
        </div>
      }

      const UpdateImages: React.FC<{ imgs: string[] | undefined }> = ({ imgs }) => {
        const CustomIcon = () => (
          <svg width="300px" height="300px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" fill="none" width="24" height="24" />
            <g>
              <path fill='#069537' d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z"/>
            </g>
          </svg>
        );

        const [imagesArray, setImagesArray] = useState<string[]>(imgs || []);  
        const router = useRouter()
        function removeImage(img:string) {
          setImagesArray(imagesArray.filter((image) => image !== img));
        } 
        function updateImage(img:string) {
          Swal.fire({
            title:"Remplacer l'image",
            input:"file",
            inputAttributes:{
              accept:"image/*"
            },
            showCancelButton:true,
            cancelButtonText:"Annuler",
            confirmButtonColor:"#009737",
            confirmButtonText:"Remplacer",
          }).then((result) => {
            if(result.isConfirmed){
              console.log(result.value)
              const formData = new FormData();
              formData.append("file",result.value)
              fetch("/api/upload", {
                method: "POST",
                body: formData,
              }).then((response) => {
                if(response.ok){
                  response.json().then((data) => { 
                    setImagesArray([...imagesArray.filter((image) => image !== img),data.URL])
                    if(company){ 
                      setTimeout(() => { 
                      updatedCompany({...updatedCompany,otherImages:[...imagesArray.filter((image) => image !== img),data.URL]})
                      }, 3000);
                    }
                  })
                }
              }).catch((err) => {
                console.log(err)
              })
            }
          })
        }
        if(imgs == undefined){
          return <div><div className="text-lg">Pas d'images supplémentaires</div></div>
        }
        return <div>
          <div className="grid grid-cols-3 gap-3">
            {imagesArray.map((img, index) => (
              <div key={index} className="relative w-fit">
                <img src={img} alt="image" className="w-150 h-auto object-cover rounded-lg mx-auto" />
                <Button
                  variant="destructive"
                  className="absolute top-0 right-0"
                  onClick={() => { 
                    removeImage(img); 
                  }}
                >
                <TrashIcon/>
                </Button>
                <Button
                  variant="secondary"
                  className="absolute top-0 left-0"
                  onClick={() => { 
                    updateImage(img)
                  }}
                >
                <EditIcon/>
                </Button>
              </div>
            ))}
            <div className="w-200">
              <Button
                variant={"outline"}
                style={{
                  height:400,
                  width:400
                }}
                onClick={() => {
                  Swal.fire({
                    title:"Selectionner une image" , 
                    input:"file" , 
                    inputAttributes:{
                      accept:"image/*"
                    },
                    showCancelButton:true,
                    confirmButtonText:"Confirmer", 
                    confirmButtonColor:"#009737",
                  }).then((response) =>{
                    if(response.isConfirmed){
                      const formData = new FormData();
                      formData.append("file",response.value)
                      let url = URL.createObjectURL(response.value)
                      fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                      }).then((response) => {
                        if(response.ok){
                          response.json().then((data) => {  
                            setImagesArray([...imagesArray,url])
                            if(company){ 
                              setTimeout(() => { 
                              setUpdatedCompany({...updatedCompany,otherImages:[...updatedCompany.otherImages,data.URL]})
                              }, 3000);
                            }
                          })
                        }
                      }).catch((err) => {
                        console.log(err)
                      })
                    }
                  })
                }}
              > 
              <CustomIcon/>
              </Button>
            </div>
          </div>
          <Button onClick={() =>{ 
            let company : any = updatedCompany 
            company.keywords = company.keywords.split(",")
            if(company){   
             axios.patch("/api/companies/" + company.id , {...company,id:undefined}).then(() => {
              Swal.fire({
                title:"Succès",
                text:"Les informations ont été mises à jour",
                icon:"success",
                confirmButtonColor:"#009737"

              }).then(() => {
                router.push("/dashboard/companies")
              })
             })
            }
          }} className='flex justify-center my-2 mx-auto'>
            Mettre à jour
          </Button>
        </div>;
      };

    return (
        <DashboardLayout> 
        {!company && <Spinner size={"large"} />}
        {!dataIsSet && company && <DataForm/>}
        {dataIsSet && <UpdateImages imgs={updatedCompany?.otherImages}/>}  
        </DashboardLayout>
    );
};

export default Page;