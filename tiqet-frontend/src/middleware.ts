import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (request.nextUrl.pathname === '/login') {
    if (token) {
      const cookie = request.headers.get('cookie')!
      const userResp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
        headers: {
          cookie,
        },
      })

      if (userResp.status === 200) {
        return NextResponse.redirect(new URL('/', request.url))
      }

      const invalidTokenResp = NextResponse.next()
      invalidTokenResp.cookies.set('token', '', {
        expires: new Date(0),
        path: '/',
      })
      return invalidTokenResp
    }
  }

  if (request.nextUrl.pathname === '/admin') {
    if (token) {
      const cookie = request.headers.get('cookie')!
      const userResp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
        headers: {
          cookie,
        },
      })

      if (userResp.status === 200) {
        const userData = await userResp.json()
        const userRoles = userData.data.roles as string[]
        if (userRoles.includes('Admin')) {
          return NextResponse.next()
        }

        return NextResponse.redirect(new URL('/', request.url))
      }

      const invalidTokenResp = NextResponse.redirect(new URL('/', request.url))
      invalidTokenResp.cookies.set('token', '', {
        expires: new Date(0),
        path: '/',
      })
      return invalidTokenResp
    }

    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (![
    '/login',
    '/favicon.ico',
  ].includes(request.nextUrl.pathname) && !request.nextUrl.pathname.startsWith('/_next/static/')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}
