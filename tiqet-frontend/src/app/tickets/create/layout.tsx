import { Container } from 'react-bootstrap'
import React from 'react'
import SidebarProvider from '@/components/Layout/Dashboard/SidebarProvider'
import SidebarOverlay from '@/components/Layout/Dashboard/Sidebar/SidebarOverlay'
import Sidebar from '@/components/Layout/Dashboard/Sidebar/Sidebar'
import SidebarNav from '@/components/Layout/Dashboard/Sidebar/SidebarNav'
import Header from '@/components/Layout/Dashboard/Header/Header'
import Footer from '@/components/Layout/Dashboard/Footer/Footer'

export const metadata = {
  title: 'Submit Ticket | Tiqet',
  description: 'Submit a new ticket!',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    {children}
    </>
  )
}
