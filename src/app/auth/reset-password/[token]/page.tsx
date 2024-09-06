import ResetPassword from "./component/ResetPassword";
import jwt from "jsonwebtoken";
import Image from "next/image";
export default function Page({ params }: { params: { token: string } }) {
   let token = params.token; 
   try {
        let decoded : any = jwt.verify(token, process.env.AUTH_SECRET || "ABC"); 
        return <div className="flex justify-center items-center w-full h-full my-5">
        <ResetPassword userId={decoded?.id} token={token} />
      </div>
   } catch (error) {
    return <div className="flex justify-center items-center flex-col w-full h-full my-5">
        <Image src="https://static.vecteezy.com/system/resources/previews/026/526/158/original/error-icon-vector.jpg" alt="404" width={300} height={300} />
        <h1 className="text-3xl font-bold">Jeton invalide</h1>
        <p className="text-muted-foreground">Le jeton de réinitialisation du mot de passe est invalide ou a expiré.</p>
        <footer>
            <h2 className="text-green-500 hover:underline">Tiktak 2023 - 2024 ©</h2>
        </footer>
    </div>
   }
  
 
  }

  