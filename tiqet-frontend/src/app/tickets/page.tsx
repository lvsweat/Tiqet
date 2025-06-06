'use client'

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
import React, { useEffect, useState } from 'react'

async function getTickets(): Promise<any> {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tickets`, {
    credentials: 'include',
  })
  const jsonData = await resp.json()
  return jsonData.data
}

export default function Page() {
  const [tickets, setTickets] = useState(null as (Array<any> | null))

  useEffect(() => {
    const loadTickets = async () => {
      setTickets(await getTickets())
    }

    loadTickets()
  }, [])

  if (!tickets) {
    return (
      <div>
        <h1 className="text-center">Tickets</h1>
        <h2 className="text-center">Loading...</h2>
      </div>
    )
  }
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
                  {item.ID}
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
