import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
  
function superAdminMiddleware(request: NextRequest) {
  const tokenFromCookies = cookies().get('token')
  let role = cookies().get('role')?.value 
  if (!tokenFromCookies || role !== 'superAdmin') {
    console.log('redirecting to login')
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url) }
}


export function middleware(request: NextRequest) {
return superAdminMiddleware(request)
   // disabled for testing purposes
   /* if (!tokenFromCookies) {
     const url = request.nextUrl.clone()
     url.pathname = "/login"
     return NextResponse.redirect(url)
   } */
} 
export const config = {
  matcher: '/dashboard/:path*' ,
}