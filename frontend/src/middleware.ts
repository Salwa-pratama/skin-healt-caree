import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected path pattern
const protectedRoutes = ['/pages/dashboard', '/pages/scan', '/pages/history', '/pages/setting'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    // Redirect to login if unauthenticated user tries to access protected views
    const loginUrl = new URL('/pages/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  if (token && request.nextUrl.pathname.startsWith('/pages/auth')) {
     const dashboardUrl = new URL('/pages/dashboard', request.url);
     return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
