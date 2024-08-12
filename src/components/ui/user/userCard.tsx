import { BellRing, Check, EyeIcon } from "lucide-react" 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Swal from "sweetalert2"
import axios from "axios"
import React from "react"
type CardProps = React.ComponentProps<typeof Card>
 
interface ClientCardProps extends CardProps {
  user: any
}

export function ClientCard({ className,user, ...props }: ClientCardProps) {

  const RoleCreation:React.FC<{role:string}> = ({role}) => {
    if(role === 'superAdmin') {
      return <p className="text-sm font-medium leading-none">Administrateur</p>
    } else if(role === 'deliveryMan') {
      return <p className="text-sm font-medium leading-none">Livreur</p>
    } else if(role === 'companyAdmin') {
      return <p className="text-sm font-medium leading-none">Entreprise</p>
    } else {
      return <p className="text-sm font-medium leading-none">Client </p>} 
  }
    const [isDeleted, setIsDeleted] = React.useState(user.isDeleted)
    React.useEffect(() => {
      
    },[isDeleted])
  function formatDate(isoString:string) {
    const date = new Date(isoString);

    // Options for formatting the date (customize as needed)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short' // This adds the timezone abbreviation
    };
  
    return date.toLocaleString('fr-FR', options as any);
  }

    const notifications = [
    {
      title: "Dernière connexion",
      description: formatDate(user?.updatedAt) || "1 hour ago",
    },
    {
      title: "Date de création",
      description: formatDate(user?.createdAt) ,
    }, 
  ]
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
        <div className="flex items-center space-x-4 rounded-md border p-4 bg-green-700  text-slate-50 w-fit">
          <p className="text-sm font-medium leading-none">
            {RoleCreation(user)} 
            </p>
          </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {user.role !== 'superAdmin' && (
           <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Bloquer le compte
            </p>
            <p className="text-sm text-muted-foreground">
              Cette option peut bloquer l'utilisateur de se connecter à l'application
            </p>
          </div>
          <Switch value={isDeleted}  onClick={() => {
            axios.patch(`/api/users/${user.id}`, {isDeleted:!user.isDeleted}).then((res) => {
              Swal.fire({
                title:"Succès",
                text:"L'utilisateur a été mis à jours avec succès",
                icon:"success",
                confirmButtonText:"Fermer",
                confirmButtonColor:"black"
              })
            }).catch((err) => {
              console.log(err)
            })
          }}  />
        </div>
        )}
       
        <div className="div">
    
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => {
          console.log(user)
          Swal.fire({
            title:"informations de compte" ,
            html: `      <div ><strong>ID:</strong> ${user.id}</div>
            <div ><strong>Name:</strong> ${user.name}</div>
            <div ><strong>Email:</strong> ${user.email}</div>
            <div ><strong>Role:</strong> ${user.role}</div>
            <div ><strong>Email Verified:</strong> ${user.isEmailVerified ? 'Yes' : 'No'}</div>
            <div ><strong>Created At:</strong> ${user.createdAt}</div>
            <div ><strong>Updated At:</strong> ${user.updatedAt}</div>
            <div ><strong>Company ID:</strong> ${user.companyId}</div>
            <div ><strong>Delivery Address:</strong> ${user.deliveryAddress || 'Not Provided'}</div>
            <div ><strong>Delivery Man ID:</strong> ${user.deliveryManId || 'Not Provided'}</div>
            <div ><strong>Is Deleted:</strong> ${user.isDeleted ? 'Yes' : 'No'}</div>
         ` , 
            icon:"info", 
            confirmButtonText:"Fermer",
            confirmButtonColor:"black"

          })
        }} className="w-fit">
          <EyeIcon className="mr-2 h-4 w-4" />Voir plus d'informations
        </Button>
      </CardFooter>
    </Card>
  )
}
