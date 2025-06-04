import React from 'react'

import {
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalDialog,
} from 'react-bootstrap'

import SubmitTicketForm from '../Form/SubmitTicketForm'

function getTags() {
  return ['Question', 'Hardware', 'Software']
}

export default async function CreateTicketModal() {
  const tags = getTags()
  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <ModalDialog
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader>
          <ModalTitle>Submit A Ticket</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <SubmitTicketForm tags={tags} />
        </ModalBody>
      </ModalDialog>
    </div>
  )
}
