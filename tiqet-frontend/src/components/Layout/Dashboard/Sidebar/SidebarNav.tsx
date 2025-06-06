'use server'

import {
  faAddressCard,
} from '@fortawesome/free-regular-svg-icons'
import {
  faDollarSign,
  faGear,
  faHistory,
  faLineChart,
  faPlus,
  faReceipt,
  faTicket,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren } from 'react'
import SidebarNavGroup from '@/components/Layout/Dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/components/Layout/Dashboard/Sidebar/SidebarNavItem'
import { getDictionary } from '@/locales/dictionary'
import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

export default async function SidebarNav() {
  const dict = await getDictionary()
  const token = cookies().get('token')!.value
  let isAdmin = false
  if (!token) {
    redirect('/login')
  } else {
    verify(token, process.env.TIQET_JWT_SECRET!, (err, decoded: any) => {
      if (err) {
        redirect('/login')
      } else {
        const roles = decoded.roles as string[]
        isAdmin = roles.includes('Admin')
      }
    }) as any
  }

  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faLineChart} href="/">{dict.sidebar.items.dashboard}</SidebarNavItem>
      {isAdmin ? <SidebarNavItem icon={faDollarSign} href="/admin">{dict.sidebar.items.admin}</SidebarNavItem> : <></>}

      <SidebarNavTitle>{dict.sidebar.items.general}</SidebarNavTitle>
      <SidebarNavGroup toggleIcon={faTicket} toggleText={dict.sidebar.items.tickets}>
        <SidebarNavItem icon={faReceipt} href="/tickets">{dict.sidebar.items.tickets_items.open_tickets}</SidebarNavItem>
        <SidebarNavItem icon={faPlus} href="/tickets/create">{dict.sidebar.items.tickets_items.submit_ticket}</SidebarNavItem>
        <SidebarNavItem icon={faHistory} href="/tickets/history">{dict.sidebar.items.tickets_items.ticket_history}</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faAddressCard} href="/account">{dict.sidebar.items.account}</SidebarNavItem>
      <SidebarNavItem icon={faGear} href="/settings">{dict.sidebar.items.settings}</SidebarNavItem>
    </ul>
  )
}
