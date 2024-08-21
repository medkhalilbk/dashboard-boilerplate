import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
  
function superAdminMiddleware(request: NextRequest) {
  const tokenFromCookies = cookies().get('token')
  let role = cookies().get('role')?.value  
  if ((!tokenFromCookies || role !== 'superAdmin') ) {
    console.log('redirecting to login')
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url) } 
}

function companyAdminMiddlware(request: NextRequest) {
  const tokenFromCookies = cookies().get('token')
  let role = cookies().get('role')?.value  
  if ((!tokenFromCookies || role !== 'companyAdmin') ) {
    console.log('redirecting to login')
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url) } 
}
function loginMiddlware(request: NextRequest) {
  const tokenFromCookies = cookies().get('token')
  let role = cookies().get('role')?.value 
  if (tokenFromCookies && role === 'superAdmin') {
    console.log('redirecting to dashboard')
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url) 
   }
  if (tokenFromCookies && role === 'companyAdmin') {
    console.log('redirecting to dashboard')
    const url = request.nextUrl.clone()
    url.pathname = "/company-dashboard"
    return NextResponse.redirect(url) 
   }
}

export function middleware(request: NextRequest) {
if(request.nextUrl.pathname.startsWith('/dashboard')) {
  return superAdminMiddleware(request) 
}
 if(request.nextUrl.pathname.startsWith("/login")) {
  return loginMiddlware(request) 
}
if(request.nextUrl.pathname.startsWith('/company-dashboard')) {
  return companyAdminMiddlware(request)
}
}
export const config = {
  matcher: ['/dashboard/:path*' , '/login' , '/company-dashboard/:path*'] ,
}