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

async function submitUser(formData: FormData) {
  const availableRoles = await getRoles()
  const selectedRoles: string[] = []

  for (let i = 0; i < availableRoles.length; i += 1) {
    const currentRole = availableRoles[i]
    if (formData.get(currentRole) === 'on') {
      selectedRoles.push(currentRole)
    }
  }

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
    {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        roles: selectedRoles,
        email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password'),
      }),
      credentials: 'include',
    },
  )
  const jsonData = await resp.json()
  return jsonData.data
}

export default function AddUserModal() {
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
    submitUser(formData)
  }

  if (!roles) {
    return (
      <Card>
        <CardHeader>
          Add New User
        </CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="addUserForm.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="name"
                type="text"
                placeholder="Full name (ex. John Doe)"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addUserForm.roles">
              <Form.Label>Roles</Form.Label>
              <br />
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Form.Group>
            <Form.Group className="mb-3" controlId="addUserForm.email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                name="email"
                type="email"
                placeholder="Email (ex. jdoe@company.com)"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addUserForm.username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                name="username"
                type="text"
                placeholder="Username (ex. jdoe)"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addUserForm.password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                type="text"
                placeholder="Password (be smart.)"
                autoFocus
              />
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
        Add New User
      </CardHeader>
      <CardBody>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="addUserForm.name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              placeholder="Full name (ex. John Doe)"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addUserForm.roles">
            <Form.Label>Roles</Form.Label>
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
          <Form.Group className="mb-3" controlId="addUserForm.email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              name="email"
              type="email"
              placeholder="Email (ex. jdoe@company.com)"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addUserForm.username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              name="username"
              type="text"
              placeholder="Username (ex. jdoe)"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addUserForm.password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              type="text"
              placeholder="Password (be smart.)"
              autoFocus
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit">Submit</Button>
          </Form.Group>
        </Form>
      </CardBody>
    </Card>
  )
}
