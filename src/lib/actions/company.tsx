import { ICompany } from "@/types/company";
import axios from "axios";

async function createCompanyRequest(company:ICompany){
try {
    company.availabilityDistance = parseInt(company.availabilityDistance.toString())
    let response = await axios.post('/api/companies', company)
    return response.data
} catch (error) {
    throw error
}

} 
export {createCompanyRequest};