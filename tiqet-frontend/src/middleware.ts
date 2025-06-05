import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { type NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextMiddlewareResult } from 'next/dist/server/web/types'
import { getLocales } from '@/locales/dictionary'
import { defaultLocale } from '@/locales/config'

export default async function middleware(request: NextRequest, event: NextFetchEvent) {

  const token = request.cookies.get('token')?.value

  if ('/login' === request.nextUrl.pathname) {
    if (token) {
      const cookie = request.headers.get('cookie')!
      const userResp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
        headers: {
          cookie
        }
      })

      if (userResp.status === 200) {
        return NextResponse.redirect(new URL('/', request.url))
      }

      const invalidTokenResp = NextResponse.next()
      invalidTokenResp.cookies.set('token', '', {
        expires: new Date(0),
        path: '/'
      })
      return invalidTokenResp
    }
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
