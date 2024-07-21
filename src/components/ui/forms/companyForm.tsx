"use client"
import { ICompany, IDay } from '@/types/company';
import {Input} from '@/components/ui/input';
import React from 'react';  
import { useForm, SubmitHandler } from "react-hook-form"

const CompanyForm = () => {
  const { handleSubmit, control, register, formState: { errors } } = useForm<ICompany>({
    defaultValues: {
      name: '',
      description: '',
      phoneNumber: '',
      location: null,
      availabilityDistance: null,
      mainImage: '',
      otherImages: [],
      workHours: { start: new Date(), end: new Date() },
      days: Object.values(IDay),
      type: 'Restaurant',
      specialty: '',
      menu: [],
      keywords: []
    }
  });

  const onSubmit = (data: ICompany) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-2/3'>
        <label className='my-2 text-lg'>Nom : </label> 
       <Input {...register('name' , {required:true})} />
      </div>

      <div>
        <label className='my-2 text-lg'>Description:</label>
        <textarea {...register('description', { required: true })} />
        {errors.description && <span>Description is required</span>}
      </div>

      <div>
        <label className='my-2 text-lg'>Tel :</label>
        <input {...register('phoneNumber')} type='number' />
      </div>

      <div>
        <label className='my-2 text-lg'>Location:</label>
        {/* Add location fields here */}
      </div>

      <div>
        <label className='my-2 text-lg'>Availability Distance:</label>
        <input type="number" {...register('availabilityDistance')} />
      </div>

      <div>
        <label className='my-2 text-lg'>Main Image URL:</label>
        <input {...register('mainImage', { required: true })} />
        {errors.mainImage && <span>Main Image URL is required</span>}
      </div>

      <div>
        <label className='my-2 text-lg'>Other Images URLs:</label>
        <input {...register('otherImages')} placeholder="Enter URLs separated by commas" />
      </div>

      <div>
        <label className='my-2 text-lg'>Work Hours:</label>
        <div>
          <label className='my-2 text-lg'>Start:</label>
          <input type="datetime-local" {...register('workHours.start')} />
        </div>
        <div>
          <label className='my-2 text-lg'>End:</label>
          <input type="datetime-local" {...register('workHours.end')} />
        </div>
      </div>

      <div>
        <label className='my-2 text-lg'>Days:</label>
        {Object.values(IDay).map(day => (
          <label key={day}>
            <input type="checkbox" value={day} {...register('days')} />
            {day}
          </label>
        ))}
      </div>

      <div>
        <label className='my-2 text-lg'>Type:</label>
        <select {...register('type')}>
          <option value="Restaurant">Restaurant</option>
          <option value="Cafe">Cafe</option>
          {/* Add more types as needed */}
        </select>
      </div>

      <div>
        <label className='my-2 text-lg'>Specialty:</label>
        <input {...register('specialty')} />
      </div>

      <div>
        <label className='my-2 text-lg'>Menu:</label>
        {/* Add menu fields here */}
      </div>

      <div>
        <label className='my-2 text-lg'>Keywords:</label>
        <input {...register('keywords')} placeholder="Enter keywords separated by commas" />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CompanyForm;
