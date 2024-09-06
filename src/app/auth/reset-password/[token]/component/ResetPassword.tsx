"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Swal from "sweetalert2"

export default function ResetPassword({userId,token} : {userId: string, token: string}) {

    let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
        e.preventDefault()
    let newPassword = (e.currentTarget.elements.namedItem("newPassword") as HTMLInputElement).value
    let confirmPassword = (e.currentTarget.elements.namedItem("confirmPassword") as HTMLInputElement).value
    if(newPassword !== confirmPassword || newPassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Les mots de passe ne correspondent pas",
        showConfirmButton: false,
        timer: 1500
      })
      return
    }
    let response = await fetch(`/api/users/${userId}/reset-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json" , 
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ password: newPassword })
    })
    
    if(response.ok){
        Swal.fire({
            icon: "success",
            title: "Mot de passe modifié avec succès",
            showConfirmButton: false,
            timer: 1500
        })
        return window.location.href = "/login"
    }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Erreur lors de la modification du mot de passe",
            showConfirmButton: false,
            timer: 1500
        })
        
    }
}

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Changement de mot de passe</h1>
        <p className="text-muted-foreground">Merci de nous fournir votre nouveau mot de passe souhaité</p>
      </div>
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-2 my-2">
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <Input id="newPassword" type="password" placeholder="Nouveau mot de passe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input id="confirmPassword" type="password" placeholder="Confirmer le mot de passe" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button  type="submit" className="w-full bg-green-500">
            Réinitialiser le mot de passe
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}