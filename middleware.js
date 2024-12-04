import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl;

  if ((url.pathname === '/login' || url.pathname === '/register') && token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.redirect(new URL('/home', req.url));
    } catch (err) {
      return NextResponse.next();
    }
  }

  if (url.pathname === '/home' && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (url.pathname === '/') {
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.redirect(new URL('/home', req.url));
      } catch (err) {
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/home'],
};
