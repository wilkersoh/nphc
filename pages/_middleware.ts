import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_TOKEN as string;

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  const { cookies } = req;

  const token = cookies.appToken;

  const url = req.url;
  const unProtectedRoutes = [ '/login' ];

  const match = unProtectedRoutes.find( route => {
    if( url.includes( route )) return true;
  })

  if( !token ) return NextResponse.next();

  /**
    Redirect Fn
  */
  // if( match !== undefined && token === undefined ) return NextResponse.next();

  // if( token === undefined ) return NextResponse.redirect(new URL('/login', req.url))

  try {
    const { payload: jwtData } = await jose.jwtVerify(
      token, new TextEncoder().encode( JWT_SECRET )
    )

    return NextResponse.next();

  } catch (error) {

    return NextResponse.next();
    // return NextResponse.redirect(new URL('/login', req.url));
  }
}
