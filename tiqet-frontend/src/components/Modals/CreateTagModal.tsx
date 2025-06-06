'use client'

import React from 'react'

import Form from 'react-bootstrap/Form'
import {
  Button, Card, CardBody, CardHeader,
} from 'react-bootstrap'

function getRoles(): string[] {
  return ['Admin', 'Support', 'User']
}

async function submitTag(formData: FormData) {
  const availableRoles = getRoles()
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
  const roles = getRoles()
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    submitTag(formData)
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
