import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faDownload,
  faEllipsisVertical,
  faMars,
  faSearch,
  faUsers,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardText,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ProgressBar,
  CardTitle,
  Row,
  Col,
  Badge,
  Modal
} from 'react-bootstrap'

import {
  faCcAmex,
  faCcApplePay,
  faCcPaypal,
  faCcStripe,
  faCcVisa,
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

import React from 'react'
import TicketsChartCard from '@/components/Page/Dashboard/TicketsChartCard'
import AcceptanceChartCard from '@/components/Page/Dashboard/AcceptanceChartCard'
import TTRChartCard from '@/components/Page/Dashboard/TTRChartCard'
import ResolvedTicketsChartCard from '@/components/Page/Dashboard/ResolvedTicketsChartCard'
import AllStatsChartCard from '@/components/Page/Dashboard/AllStatsChartCard'
import serverFetch from '@/utils/server-fetch'
import CreateTicketModal from '@/components/Modals/CreateTicketModal'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/option'
import jwt from 'jsonwebtoken'

export const metadata = {
  title: "Submit Ticket | Tiqet",
  description: "Submit a new ticket!"
}


export default async function Page() {
  return (
    <>
      <CreateTicketModal />
    </>
  )
}
