'use client'

import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import { Button } from 'react-bootstrap'

function getRoles(): string[] {
  return ['Admin', 'Support', 'User']
}

async function submitUser(formData: FormData) {
  const availableRoles = getRoles()
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
        title: formData.get('title'),
        tags: selectedRoles,
        description: formData.get('description'),
      }),
      credentials: 'include',
    },
  )
  const jsonData = await resp.json()
  return jsonData.data
}

export default function AddUserModal() {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    submitUser(formData)
  }

  const roles = getRoles()

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                name="name"
                type="text"
                placeholder="Username (ex. jdoe)"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addUserForm.password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="name"
                type="text"
                placeholder="Password (be smart.)"
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit">Submit</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  )
}
