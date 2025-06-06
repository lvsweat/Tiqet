'use client'

import React, { useEffect, useState } from 'react'

import Placeholder from 'react-bootstrap/Placeholder'
import Form from 'react-bootstrap/Form'

import { Button, Spinner } from 'react-bootstrap'

async function getTags(): Promise<string[]> {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`, {
    credentials: 'include',
  })
  const jsonData = await resp.json()
  return jsonData.data
}

async function submitTicket(formData: FormData, tags: any[]) {
  const availableTags = tags
  const selectedTags: string[] = []

  for (let i = 0; i < availableTags.length; i += 1) {
    const currentTag = availableTags[i].name
    if (formData.get(currentTag) === 'on') {
      selectedTags.push(currentTag)
    }
  }

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tickets`,
    {
      method: 'POST',
      body: JSON.stringify({
        title: formData.get('title'),
        tags: selectedTags,
        description: formData.get('description'),
      }),
      credentials: 'include',
    },
  )
  const jsonData = await resp.json()
  return jsonData.data
}

export default function CreateTicketModal() {
  const [tags, setTags] = useState(null as (string[] | null))
  useEffect(() => {
    const loadTickets = async () => {
      setTags(await getTags())
    }

    loadTickets()
  }, [])
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    submitTicket(formData, tags!)
  }

  if (!tags) {
    return (
      <>
        <h2 className="text-center">Submit A Ticket</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="submitTicketForm.title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              name="title"
              type="text"
              placeholder="TLDR title of your issue"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="submitTicketForm.tags">
            <Form.Label>Tags</Form.Label>
            <br />
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="submitTicketForm.description"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control required name="description" as="textarea" placeholder="Enter details about your issue here. How it happened, what is currently happening, steps to reproduce, anything you can provide." rows={6} />
          </Form.Group>
          <Form.Group>
            <Placeholder.Button xs={1} />
          </Form.Group>
        </Form>
      </>
    )
  }

  return (
    <>
      <h2 className="text-center">Submit A Ticket</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="submitTicketForm.title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            name="title"
            type="text"
            placeholder="TLDR title of your issue"
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="submitTicketForm.tags">
          <Form.Label>Tags</Form.Label>
          {tags.map((tag: any) => (
            <Form.Check
              type="checkbox"
              name={tag.name}
              key={tag.name}
              id={tag.name}
              label={tag.name}
            />
          ))}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="submitTicketForm.description"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control required name="description" as="textarea" placeholder="Enter details about your issue here. How it happened, what is currently happening, steps to reproduce, anything you can provide." rows={6} />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Submit</Button>
        </Form.Group>
      </Form>
    </>
  )
}
