import {
  faAddressCard,
} from '@fortawesome/free-regular-svg-icons'
import {
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

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

export default async function SidebarNav() {
  const dict = await getDictionary()
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faLineChart} href="/">{dict.sidebar.items.dashboard}</SidebarNavItem>
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
