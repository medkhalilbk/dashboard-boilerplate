import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
  
export function middleware(request: NextRequest) {
   const tokenFromCookies = cookies().get('token')
   if (!tokenFromCookies) {
     const url = request.nextUrl.clone()
     url.pathname = "/login"
     return NextResponse.redirect(url)
   }
} 
export const config = {
  matcher: '/dashboard' ,
}