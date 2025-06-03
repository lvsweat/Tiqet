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
  Modal,
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
import jwt from 'jsonwebtoken'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/option'

export const metadata = {
  title: "Tickets | Tiqet",
  description: "Where you find all your open tickets!"
}

async function getTickets() {
  const user = await getServerSession(authOptions);
  const jwtToken = jwt.sign({
    userId: user?.user.ID
  }, process.env.TIQET_JWT_SECRET!)

  let resp = await serverFetch(`${process.env.BACKEND_URL}/tickets`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  )
  let jsonData = await resp.json()
  return jsonData.data
}

export default async function Page() {
  const tickets = await getTickets();
  return (
    <div>
      <h1 className='text-center'>Tickets</h1>
      <div className="row">

        {tickets.map((item: any, index: number) => (
          <div className="col-sm-6 col-lg-3">
            <Card bg="secondary" className="mb-4">
              <CardBody>
                <CardHeader>Ticket #{item.id}</CardHeader>
                <CardHeader>{item.tags.map((tag: string, tagIndex: number) => (
                  <Badge pill bg={tag == "Software" ? "warning" : (tag == "Hardware" ? "danger" : "info")}>
                    {tag}
                  </Badge>
                ))}</CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardText>
                  {item.description}
                </CardText>
                <CardFooter>
                  <Row md={3}>
                    <Col>
                      <Button variant="primary">Status</Button>
                    </Col>
                    <Col>
                      <Button variant="danger">Close</Button>
                    </Col>
                  </Row>
                </CardFooter>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
