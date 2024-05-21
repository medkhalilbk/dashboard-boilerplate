import axios from "axios"
export async function getStacksAction(){
return axios.get('/api/stacks')
}
export async function addStackAction(stack: { name: string; iconUrl: string; family?: string; }) {
    return axios.post('/api/stacks', stack)
}
export async function deleteStackAction(id: string) {
    return axios.delete('/api/stacks', {data: {id}})
}
export async function editStackAction(stack: {id:string, name: string; iconUrl: string; family?: string; }) {
    return axios.put('/api/stacks', stack)
}