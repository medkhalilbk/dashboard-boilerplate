"use client"
import { ICompany, IDay } from '@/types/company';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';  
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Textarea } from '../textarea';
import { Slider } from '../slider'; 
import { Checkbox } from '../checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../select'; 
import { getLongAndLatFromUrl } from '@/lib/utils';
import { Button } from '../button';
import { createCompanyRequest } from '@/lib/actions/company';
import { useDispatch } from 'react-redux';
import { addCompany } from '@/lib/features/companySlice';

type CompanyFormProps = {
  submitAction: any
  setStep:any
};

const CompanyForm = ({ submitAction,setStep }: CompanyFormProps) => {
  const [distance, setDistance] = useState(0)
  const [openingTime, setOpeningTime] = useState({ hours: 0, minutes: 0 })
  const [closingTime, setClosingTime] = useState({ hours: 0, minutes: 0 })
  const [keywordText,setKeywordText] = useState('')
  const [keywordsArray, setKeywordsArray] = useState<string[]>([]) 
  const [days, setDays] = useState<string[]>([])
  const [location, setLocation] = useState<any>(null)
  const [errorUrl, seterrorUrl] = useState(false)
  const dispatch = useDispatch()
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
  
  useEffect(() => { 
    if(keywordText !== ""){
      setKeywordsArray(keywordText.split(/,\s*|\s+/))
    }
    () => {
      if(keywordText === ""){
        setKeywordsArray([])
      }
    }
  }, [keywordText])
  useEffect(() => {
    setValue('keywords', keywordsArray)
  } ,  [keywordsArray])
useEffect(() => {   
  let stringOpeningTime = `${openingTime.hours < 10?  "0"+openingTime.hours : openingTime.hours}:${openingTime.minutes > 10? openingTime.minutes : "0"+openingTime.minutes}` 
  let stringCloseTime = `${closingTime.hours < 10?  "0"+closingTime.hours : closingTime.hours}:${closingTime.minutes > 10? closingTime.minutes : "0"+closingTime.minutes}`
  setValue('workHours', { start: stringOpeningTime, end: stringCloseTime })
}, [openingTime,closingTime])

useEffect(()=> {

  if(location) {
    setValue('location', location)
  }

} , [location])
  const onSubmit: SubmitHandler<ICompany> = (data) => {
    createCompanyRequest(data).then((res) => {
      dispatch(addCompany({...data,id:res.data.id})) 
      submitAction(res.data)
      setStep(2)
    }).catch((error) => {
      console.log(error)
    })
    
  };

  useEffect(() => {
    setValue("days", days)
  } , [days])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=''>
        <label className='my-2 '>Nom : </label> 
        <Input {...register('name', { required: true })} />
       
        <label className='my-2 '>Description:</label>
        <Textarea {...register('description', { required: true })} /> 
        {errors.description && <span>Description is required</span>}
        
        <label className='my-2 '>Tel :</label>
        <Input {...register('phoneNumber')} type='number' />
        
        <label className='my-2 '>Localisation (Lien Google Maps):</label> 
        <Input  onChange={(input:React.FormEvent<HTMLInputElement>) => {
          if(getLongAndLatFromUrl(input.currentTarget.value) ){ 
            setLocation(getLongAndLatFromUrl(input.currentTarget.value))
            seterrorUrl(false)
          }else{
            seterrorUrl(true)
          }
        }} type='text' />
        {errorUrl && <p className='text-red-600 my-2'>Erreur de lien </p>}
        <label className='my-2 '>Distance de disponibilité {distance} (KM):</label> 
        <Slider 
          className='mb-4'
          {...register('availabilityDistance')}
          min={0}
          max={100}
          onValueChange={ (value) => {
            setDistance(value[0])
          }}
        />
    
        <label className='my-2 '>Heure d&apos;ouverture : </label>
        <div className="flex row gap-x-3">
          <div className="flex flex-col"> 
            <label className='text-sm'> Heures</label>
            <Input 
              onChange={(input: React.FormEvent<HTMLInputElement>) => { 
                setOpeningTime({ hours: parseInt(input.currentTarget.value), minutes: openingTime.minutes })
              }} 
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
              min={0}
            />
          </div> 
        </div>
        <div className='flex flex-col mt-3'> 
        {Object.values(IDay).map(day => (
          <label key={day}>
            <p className='capitalize'>
              <Checkbox onClick={() => {
                setDays([...days, day])
              }}  value={day} className='mr-2' />
              {day}
            </p>
          </label>
        ))}
      </div>

      <div>
        <label className='my-2 '>Type d&apos;entreprise :</label>
        <div className="relative">
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger>
                  {field.value ? field.value : 'Type'}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Restaurant">Restaurant</SelectItem>
                  <SelectItem value="Café">Café</SelectItem>
                  <SelectItem value="Entreprise" disabled>Entreprise</SelectItem>
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
        required
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
      <div>
        <label className='my-2 '>Mots clé (utiliser ,  ou espace comme séparateur) :</label>
        <Input onChange={(input:React.FormEvent<HTMLInputElement>) => {
          setKeywordText(input.currentTarget.value)
        }} />
      <div className='my-4'>
      {keywordsArray.map((keyword, index) => (
    <span key={index} className='bg-green-200 px-2 py-1 rounded-full text-sm mr-2'>{keyword}</span>
))}

      </div>     
      </div>
  <Button type='submit' variant={"default"} > Suivant </Button>
      </div>


    </form>
  );
};

export default CompanyForm;
