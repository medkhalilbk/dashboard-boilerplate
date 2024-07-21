import axios from "axios";

const token =  process.env.NEXT_PUBLIC_GITHUB_API_TOKEN;  
export async function getGithubRepos() {
    try {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization :`Bearer ${token}`
              }
        })
        return response.data
    } catch (error) {
        throw error
    } 
}