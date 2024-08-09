"use client"
import DashboardLayout from '@/components/dashboardUILayout';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ICompany } from '@/types/company';
import axios from 'axios';
import CompanyForm from '@/components/ui/forms/companyForm';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { set } from 'date-fns';
import { Slider } from '@/components/ui/slider';
import { getLongAndLatFromUrl, getUrlFromLongAndLat } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

const Page: React.FC = () => {
    const { id } = useParams() as { id: string };
    const [company, setCompany] = useState<ICompany>();
    const [distance, setDistance] = useState(0)
    const [openingTime, setOpeningTime] = useState({ hours: 0, minutes: 0 })
    const [closingTime, setClosingTime] = useState({ hours: 0, minutes: 0 }) 
    const [location, setLocation] = useState<any>({longitude:0,latitude:0})
    const [errorUrl, seterrorUrl] = useState(false)
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
        console.log(company)
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
        }
    },[company])

    const { handleSubmit, control,setValue, register, formState: { errors }  } = useForm<ICompany>({
        defaultValues: {
          name: '',
          description: '',
          phoneNumber: '',
          location: {
            latitude: 0,
            longitude: 0,
          },
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
      const DataForm : React.FC = () => {
        return     <div>
                
        <label className='my-2 '>Idendifiant unique : </label> 
    <Input disabled {...register('id', { required: true })} />
        <label className='my-2 '>Nom : </label> 
    <Input {...register('name', { required: true })} />
    <label className='my-2 '>Description:</label>
    <Textarea {...register('description', { required: true })} /> 
    {errors.description && <span>Description is required</span>}
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
        <label className='text-sm'> Heures</label>
        <Input 
          onChange={(input: React.FormEvent<HTMLInputElement>) => { 
            setOpeningTime({ hours: parseInt(input.currentTarget.value), minutes: openingTime.minutes })
          }} 
          value={openingTime.hours}
          type="number" 
          max={23} 
          min={0}
        />
      </div>
      <div className="flex flex-col"> 
        <label className='text-sm'> Minutes</label>
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

   {/* {location && <>
    <label className='my-2 '>Localisation (Lien Google Maps):</label> 
    <Input  value={getUrlFromLongAndLat(location)} onChange={(input:React.FormEvent<HTMLInputElement>) => {
      if(getLongAndLatFromUrl(input.currentTarget.value)){ 
        setLocation(getLongAndLatFromUrl(input.currentTarget.value))
        seterrorUrl(false)
      }else{
        seterrorUrl(true)
      }
    }} type='text' />
    {errorUrl && <p className='text-red-600 my-2'>Erreur de lien </p>}</>} */}

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
<div className="relative">
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
</div>
</div>
        </div>
      }
    return (
        <DashboardLayout>
        <DataForm/>
        </DashboardLayout>
    );
};

export default Page;