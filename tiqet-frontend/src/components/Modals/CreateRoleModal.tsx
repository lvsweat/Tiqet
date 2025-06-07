'use client'

import React from 'react'

import Form from 'react-bootstrap/Form'
import {
  Button, Card, CardBody, CardHeader,
} from 'react-bootstrap'

async function submitRole(formData: FormData) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles`,
    {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
      }),
      credentials: 'include',
    },
  )
  const jsonData = await resp.json()
  return jsonData.data
}

export default function CreateRoleModal() {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    submitRole(formData)
  }

  return (
    <Card>
      <CardHeader>
        Create New Role
      </CardHeader>
      <CardBody>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="createRoleForm.name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              placeholder="New role name (eg. Manager)"
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
