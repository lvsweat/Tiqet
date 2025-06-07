'use client'

import React, { useEffect, useState } from 'react'

import Form from 'react-bootstrap/Form'
import {
  Button, Card, CardBody, CardHeader,
  Spinner,
} from 'react-bootstrap'

async function getRoles(): Promise<string[]> {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roles`, {
    credentials: 'include',
  })
  const jsonData = await resp.json()
  return jsonData.data
}

async function submitTag(formData: FormData) {
  const availableRoles = await getRoles()
  const selectedRoles: string[] = []

  for (let i = 0; i < availableRoles.length; i += 1) {
    const currentRole = availableRoles[i]
    if (formData.get(currentRole) === 'on') {
      selectedRoles.push(currentRole)
    }
  }

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`,
    {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        roles: selectedRoles,
      }),
      credentials: 'include',
    },
  )
  const jsonData = await resp.json()
  return jsonData.data
}

export default function CreateTagModal() {
  const [roles, setRoles] = useState(null as (string[] | null))
  useEffect(() => {
    const loadTickets = async () => {
      setRoles(await getRoles())
    }
    loadTickets()
  }, [])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    submitTag(formData)
  }

  if (!roles) {
    return (
      <Card>
        <CardHeader>
          Create New Tag
        </CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="createTagForm.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="name"
                type="text"
                placeholder="New tag name (eg. Software)"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createTagForm.roles">
              <Form.Label>Permitted Roles</Form.Label>
              <br />
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Form.Group>
            <Form.Group>
              <Button type="submit">Submit</Button>
            </Form.Group>
          </Form>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        Create New Tag
      </CardHeader>
      <CardBody>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="createTagForm.name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              placeholder="New tag name (eg. Software)"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="createTagForm.roles">
            <Form.Label>Permitted Roles</Form.Label>
            {roles.map((role: any) => (
              <Form.Check
                type="checkbox"
                name={role.name}
                key={role.name}
                id={role.name}
                label={role.name}
              />
            ))}
          </Form.Group>
          <Form.Group>
            <Button type="submit">Submit</Button>
          </Form.Group>
        </Form>
      </CardBody>
    </Card>
  )
}
