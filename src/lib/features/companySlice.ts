// src/slices/companySlice.ts

import { ICompany, IDay } from '@/types/company';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CompanyState {
  data: ICompany[];
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  data: [
    {
      id: '1',
      name: "Tarkan",
      description: "Restaurant turc",
      phoneNumber: "0666666666",
      location: { latitude: 1, longitude: 2 },
      availabilityDistance: 10,
      mainImage: "https://scontent.ftun2-2.fna.fbcdn.net/v/t1.6435-9/72579203_140583510635492_2785117477766430720_n.png?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=m4x4o7OPMZ8Q7kNvgHZQ_cu&_nc_ht=scontent.ftun2-2.fna&oh=00_AYBaiky58S_nfCUo5MlWBrt4rj5RMf-486kjV8RCnu-8Aw&oe=66C32C9D",
      otherImages: ["url1", "url2"],
      workHours: { start: new Date(), end: new Date() },
      days: [
        IDay.lundi,
        IDay.mardi,
        IDay.mercredi,
        IDay.jeudi,
        IDay.vendredi,
        IDay.samedi,
        IDay.dimanche
      ],
      type: "Restaurant",
      specialty: "Turc",
      menu: [],
      keywords: ["tarkan", "restaurant", "turc"]
    },
    {
      id: '2',
      name: "Le Jardin Secret",
      description: "Fine dining français",
      phoneNumber: "0777777777",
      location: { latitude: 48.8566, longitude: 2.3522 }, // Paris coordinates
      availabilityDistance: 15,
      mainImage: "url",
      otherImages: ["url3", "url4"],
      workHours: { start: new Date(), end: new Date() },
      days: [
        IDay.lundi,
        IDay.mardi,
        IDay.mercredi,
        IDay.jeudi,
        IDay.vendredi,
        IDay.samedi,
        IDay.dimanche
      ],
      type: "Restaurant",
      specialty: "French cuisine",
      menu: [],
      keywords: ["french cuisine", "fine dining", "Paris"]
    },
    {
      id: '3',
      name: "Sushi Palace",
      description: "Authentic Japanese cuisine",
      phoneNumber: "0888888888",
      location: { latitude: 35.6895, longitude: 139.6917 }, // Tokyo coordinates
      availabilityDistance: 12,
      mainImage: "url",
      otherImages: ["url5", "url6"],
      workHours: { start: new Date(), end: new Date() },
      days: [
        IDay.lundi,
        IDay.dimanche,
        IDay.mardi,
        IDay.mercredi,
        IDay.jeudi,
        IDay.vendredi,
        IDay.samedi
      ],
      type: "Restaurant",
      specialty: "Japanese cuisine",
      menu: [],
      keywords: ["sushi", "Japanese food", "Tokyo"]
    },
    {
      id: '4',
      name: "La Piazza",
      description: "Italian trattoria",
      phoneNumber: "0999999999",
      location: { latitude: 41.9028, longitude: 12.4964 }, // Rome coordinates
      availabilityDistance: 20,
      mainImage: "url",
      otherImages: ["url7", "url8"],
      workHours: { start: new Date(), end: new Date() },
      days: [
        IDay.lundi,
        IDay.dimanche,
        IDay.mardi,
        IDay.mercredi,
        IDay.jeudi,
        IDay.vendredi,
        IDay.samedi
      ],
      type: "Restaurant",
      specialty: "Italian cuisine",
      menu: [],
      keywords: ["Italian food", "pasta", "Rome"]
    },
    {
      id: '5',
      name: "El Taquito",
      description: "Authentic Mexican cuisine",
      phoneNumber: "0111111111",
      location: { latitude: 19.4326, longitude: -99.1332 }, // Mexico City coordinates
      availabilityDistance: 18,
      mainImage: "url",
      otherImages: ["url9", "url10"],
      workHours: { start: new Date(), end: new Date() },
      days: [
        IDay.lundi,
        IDay.dimanche,
        IDay.mardi,
        IDay.mercredi,
        IDay.jeudi,
        IDay.vendredi,
        IDay.samedi
      ],
      type: "Restaurant",
      specialty: "Mexican cuisine",
      menu: [],
      keywords: ["tacos", "enchiladas", "Mexico City"]
    },
    {
      id: '6',
      name: "Burger Heaven",
      description: "Gourmet burgers and fries",
      phoneNumber: "0222222222",
      location: { latitude: 40.7128, longitude: -74.0060 }, // New York City coordinates
      availabilityDistance: 25,
      mainImage: "url",
      otherImages: ["url11", "url12"],
      workHours: { start: new Date(), end: new Date() },
      days: [
        IDay.lundi,
        IDay.dimanche,
        IDay.mardi,
        IDay.mercredi,
        IDay.jeudi,
        IDay.vendredi,
        IDay.samedi
      ],
      type: "Restaurant",
      specialty: "American cuisine",
      menu: [],
      keywords: ["burgers", "fries", "NYC"]
    },
    {
      id: '7',
      name: "Veggie Delight",
      description: "Vegetarian and vegan dishes",
      phoneNumber: "0333333333",
      location: { latitude: 51.5074, longitude: -0.1278 }, // London coordinates
      availabilityDistance: 22,
      mainImage: "url",
      otherImages: ["url13", "url14"],
      workHours: { start: new Date(), end: new Date() },
      days: [
        IDay.lundi,
        IDay.dimanche,
        IDay.mardi,
        IDay.mercredi,
        IDay.jeudi,
        IDay.vendredi,
        IDay.samedi
      ],
      type: "Restaurant",
      specialty: "Vegetarian cuisine",
      menu: [],
      keywords: ["vegetarian", "vegan", "London"]
    },
    {
      id: '8',
      name: "The Seafood Shack",
      description: "Fresh seafood restaurant",
      phoneNumber: "0444444444",
      location: { latitude: -33.8688, longitude: 151.2093 }, // Sydney coordinates
      availabilityDistance: 30,
      mainImage: "url",
      otherImages: ["url15", "url16"],
      workHours: { start: new Date(), end: new Date() },
      days: [
        IDay.lundi,
        IDay.dimanche,
        IDay.mardi,
        IDay.mercredi,
        IDay.jeudi,
        IDay.vendredi,
        IDay.samedi
      ],
      type: "Restaurant",
      specialty: "Seafood",
      menu: [],
      keywords: ["seafood", "fresh fish", "Sydney"]
    },
    {
      id: '9',
      name: "Café de Paris",
      description: "Cozy café with French pastries",
      phoneNumber: "0555555555",
      location: { latitude: 48.8566, longitude: 2.3522 }, // Paris coordinates
      availabilityDistance: 12,
      mainImage: "url",
      otherImages: ["url17", "url18"],
      workHours: { start: new Date(), end: new Date() },
      days: [
        IDay.lundi,
        IDay.dimanche,
        IDay.mardi,
        IDay.mercredi,
        IDay.jeudi,
        IDay.vendredi,
        IDay.samedi
      ],
      type: "Café",
      specialty: "French pastries",
      menu: [],
      keywords: ["café", "pastries", "Paris"]
    },
    {
      id: '10',
      name: "Pizza Napoli",
      description: "Authentic Neapolitan pizza",
      phoneNumber: "0666666666",
      location: { latitude: 40.8518, longitude: 14.2681 }, // Naples coordinates
      availabilityDistance: 18,
      mainImage: "url",
      otherImages: ["url19", "url20"],
      workHours: { start: new Date(), end: new Date() },
      days: [
        IDay.lundi,
        IDay.dimanche,
        IDay.mardi,
        IDay.mercredi,
        IDay.jeudi,
        IDay.vendredi,
        IDay.samedi
      ],
      type: "Restaurant",
      specialty: "Neapolitan pizza",
      menu: [],
      keywords: ["pizza", "Neapolitan", "Naples"]
    }
  ],
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<ICompany>) => {
      state.data.push(action.payload);
    },
    updateCompany: (state, action: PayloadAction<ICompany>) => {
      const index = state.data.findIndex(company => company.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteCompany: (state, action: PayloadAction<{ id: string }>) => {
      state.data = state.data.filter(company => company.id !== action.payload.id);
    },
    setCompanies: (state, action: PayloadAction<ICompany[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addCompany, updateCompany, deleteCompany, setCompanies, setLoading, setError } = companySlice.actions;

export default companySlice.reducer;
