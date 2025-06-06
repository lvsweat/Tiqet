'use client'

import React from 'react'

import Form from 'react-bootstrap/Form'
import { Button, Card, CardBody, CardHeader } from 'react-bootstrap'

function getRoles(): string[] {
  return ['Admin', 'Support', 'User']
}

export default function CreateTagModal() {
  const roles = getRoles()
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const formData = new FormData(event.currentTarget)
    // submitTicket(formData)
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
              {roles.map((role) => (
                <Form.Check
                  type="checkbox"
                  name={role}
                  key={role}
                  id={role}
                  label={role}
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
