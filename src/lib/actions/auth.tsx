import axios from "axios";
import { Iuser } from "../features/userSlice";

export function loginAction(user: { email: string; password: string; }) { 
return axios.post('/api/auth', user)
}
