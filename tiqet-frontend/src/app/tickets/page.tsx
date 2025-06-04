import {
  Button,
  Card,
  CardBody,
  CardText,
  CardFooter,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Badge,
} from 'react-bootstrap'
import React from 'react'
import serverFetch from '@/utils/server-fetch'
import jwt from 'jsonwebtoken'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/option'

export const metadata = {
  title: 'Tickets | Tiqet',
  description: 'Where you find all your open tickets!',
}

async function getTickets() {
  const user = await getServerSession(authOptions)
  const jwtToken = jwt.sign({
    userId: user?.user.ID,
  }, process.env.TIQET_JWT_SECRET!)

  const resp = await serverFetch(
    `${process.env.BACKEND_URL}/tickets`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    },
  )
  const jsonData = await resp.json()
  return jsonData.data
}

export default async function Page() {
  const tickets = await getTickets()
  return (
    <div>
      <h1 className="text-center">Tickets</h1>
      <div className="row">

        {tickets.map((item: any) => (
          <div className="col-sm-6 col-lg-3">
            <Card bg="secondary" className="mb-4">
              <CardBody>
                <CardHeader>
                  Ticket #
                  {item.id}
                </CardHeader>
                <CardHeader>
                  {item.tags.map((tag: string) => (
                    <Badge pill bg={tag === 'Hardware' ? 'danger' : 'info'}>
                      {tag}
                    </Badge>
                  ))}
                </CardHeader>
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
