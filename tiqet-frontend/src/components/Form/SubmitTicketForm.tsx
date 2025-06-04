'use client'

import React from 'react'

import {
  Button,
} from 'react-bootstrap'

import Form from 'react-bootstrap/Form'

interface Props {
  tags: string[];
}

// async function submitTicket(formData: FormData, user: User, tags: string[], backend_url: string) {
//  console.log('GOT HERE!')
//  const selectedTags: string[] = []
//
//  for (let i = 0; i < tags.length; i += 1) {
//    const currentTag = tags[i]
//    if (formData.get(currentTag) === 'on') {
//      selectedTags.push(currentTag)
//    }
//  }
//
//  const resp = await fetch(
//    `${backend_url}/tickets`,
//    {
//      method: 'POST',
//      body: JSON.stringify({
//        title: formData.get('title'),
//        tags: selectedTags,
//        description: formData.get('description'),
//      }),
//    },
//  )
//  const jsonData = await resp.json()
//  return jsonData.data
// }

export default function SubmitTicketForm({ tags }: Props) {
  // const onSubmit = function (event: React.FormEvent<HTMLFormElement>) {
  //  event.preventDefault()
  //  const formData = new FormData(event.currentTarget)
  //  submitTicket(formData, user, tags, backend_url)
  // }

  return (
    <Form>
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
        {tags.map((tag) => (
          <Form.Check
            type="checkbox"
            name={tag}
            key={tag}
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
        <Form.Control required name="description" as="textarea" placeholder="Enter details about your issue here. How it happened, what is currently happening, steps to reproduce, anything you can provide." rows={6} />
      </Form.Group>
      <Form.Group>
        <Button type="submit">Submit</Button>
      </Form.Group>
    </Form>
  )
}
