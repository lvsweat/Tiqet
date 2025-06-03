import { Line } from 'react-chartjs-2'
import React from 'react'
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ProgressBar,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalDialog,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck
} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import serverFetch from '@/utils/server-fetch'
import SubmitTicketForm from '../Form/SubmitTicketForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/option'

function getTags() {
  return ["Question", "Hardware", "Software"]
}

export default async function CreateTicketModal() {
  const tags = getTags()
  const user = await getServerSession(authOptions)
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
          <SubmitTicketForm tags={tags} user={user!.user} backend_url={process.env.BACKEND_URL!}/>
        </ModalBody>
      </ModalDialog>
    </div>
  )
}