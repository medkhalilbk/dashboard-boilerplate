import axios from "axios"
export async function getStacksAction(){
return axios.get('/api/stacks')
}