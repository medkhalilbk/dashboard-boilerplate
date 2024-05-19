import * as jwt from "jsonwebtoken";


export default async function isValidJWT(token: string) {
    try {
        if(!token) return false;
        const decoded = jwt.verify(token, process.env.AUTH_SECRET);
        return decoded;
    } catch (error) {
        return false;
    }
}
