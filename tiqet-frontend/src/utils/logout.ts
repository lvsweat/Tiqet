'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function logOut() {
    cookies().set('token', '', {
        expires: new Date(0),
        path: '/'
    })
    redirect('/login')
}