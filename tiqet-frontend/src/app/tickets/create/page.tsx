import React from 'react'
import CreateTicketModal from '@/components/Modals/CreateTicketModal'

export const metadata = {
  title: 'Submit Ticket | Tiqet',
  description: 'Submit a new ticket!',
}

export default async function Page() {
  return (
    <CreateTicketModal />
  )
}
