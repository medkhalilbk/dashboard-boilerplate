"use client"
import React, { useState } from 'react';
import { Button } from '../button';

interface UserFormProps {
    onSubmit: any;
}

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

const DeliveryManForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        password: '',
        role: 'user',
        isEmailVerified: true,
        imgUrl: '',
        deliveryManData: {
            fullName: '',
            phoneNumber: '',
            socialStatus: '',
            cin: '',
            isActive: true,
        }
    });

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleDeliveryManDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            deliveryManData: {
                ...prevUser.deliveryManData,
                [name]: type === 'checkbox' ? checked : value,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(user);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom complet:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleUserChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleUserChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe:
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleUserChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <small className='text-red-500'>
                    Mot de passe doit contenir au moins 8 caractères et au moins une lettre et un chiffre.
                </small>
            </div>
            <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Telephone:
                </label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={user.deliveryManData.phoneNumber}
                    onChange={handleDeliveryManDataChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="socialStatus" className="block text-sm font-medium text-gray-700">
                    Statut social:
                </label>
                <input
                    type="text"
                    id="socialStatus"
                    name="socialStatus"
                    value={user.deliveryManData.socialStatus}
                    onChange={handleDeliveryManDataChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="cin" className="block text-sm font-medium text-gray-700">
                    CIN:
                </label>
                <input
                    type="text"
                    id="cin"
                    name="cin"
                    value={user.deliveryManData.cin}
                    onChange={handleDeliveryManDataChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="isActive" className="flex items-center">
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={user.deliveryManData.isActive}
                        onChange={handleDeliveryManDataChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Actif?</span>
                </label>
            </div>
            <div className="mb-4">
                <Button>
                    Suivant
                </Button>
            </div>
        </form>
    );
};

export default DeliveryManForm;
