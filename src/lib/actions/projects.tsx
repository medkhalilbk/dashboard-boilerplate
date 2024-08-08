import axios from "axios"
export async function getStacksAction(){
return axios.get('/api/stacks')
}
export async function addProjectAction(stack: { name: string; iconUrl: string; family?: string; }) {
    return axios.post('/api/projects', stack)
}
export async function deleteProjectAction(id: string) {
    return axios.delete('/api/projects', {data: {id}})
}
export async function ediotProjectAction(stack: {id:string, name: string; iconUrl: string; family?: string; }) {
    return axios.put('/api/projects', stack)
}