import { authOptions } from '@/app/api/auth/option';
import serverFetch from '@/utils/server-fetch';
import { getServerSession, User } from 'next-auth';
import React, { FormEvent } from 'react'
import jwt from 'jsonwebtoken'

import {
  Button
} from 'react-bootstrap'

import Form from 'react-bootstrap/Form'

interface Props {
  tags: string[]
  user: User,
  backend_url: string
}

async function submitTicket(formData: FormData, user: User, tags: string[], backend_url: string) {
  console.log("GOT HERE!")
  let selectedTags: string[] = [];

  for (let i = 0; i < tags.length; ++i) {
    let currentTag = tags[i]
    if (formData.get(currentTag) == "on") {
      selectedTags.push(currentTag)
    }
  }

  let resp = await fetch(`${backend_url}/tickets`,
    {
      method: "POST",
      body: JSON.stringify({
        title: formData.get("title"),
        tags: selectedTags,
        description: formData.get("description")
      })
    }
  )
  let jsonData = await resp.json()
  return jsonData.data
}

export default function SubmitTicketForm({tags, user, backend_url}: Props) {
  const onSubmit = function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let formData = new FormData(event.currentTarget)
    submitTicket(formData, user, tags, backend_url)
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="submitTicketForm.title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            name='title'
            type="text"
            placeholder="TLDR title of your issue"
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="submitTicketForm.tags">
          <Form.Label>Tags</Form.Label>
          {tags.map((tag) => (
              <Form.Check // prettier-ignore
                type='checkbox'
                name={tag}
                id={tag}
                label={tag}
              />
          ))}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="submitTicketForm.description"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control required name='description' as="textarea" placeholder='Enter details about your issue here. How it happened, what is currently happening, steps to reproduce, anything you can provide.' rows={6} />
        </Form.Group>
        <Form.Group>
          <Button type='submit'>Submit</Button>
        </Form.Group>
      </Form>
    </>
  )
}







