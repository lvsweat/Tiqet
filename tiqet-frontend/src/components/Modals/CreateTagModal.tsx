'use client'

import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import { Button } from 'react-bootstrap'

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
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Create Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="createTagForm.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="title"
                type="text"
                placeholder="Name of the new tag"
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
        </Modal.Body>
      </Modal.Dialog>
    </div>
  )
}
