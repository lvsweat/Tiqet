import React from 'react'

import {
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalDialog,
} from 'react-bootstrap'

import SubmitTicketForm from '../Form/SubmitTicketForm'

export default async function CreateTicketModal() {
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
          <SubmitTicketForm />
        </ModalBody>
      </ModalDialog>
    </div>
  )
}
