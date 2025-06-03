'use client'

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
} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

function getMonthHistory() {
  return ['November', 'December', 'January', 'February', 'March', 'April', 'May'];
}

function getTicketHistory() {
  return [50, 30, 27, 84, 52, 50, 62];
}

interface Props {
  dict: any;
}

export default function ResolvedTicketsChartCard({dict}: Props) {
  const monthHistory = getMonthHistory();
  const ticketHistory = getTicketHistory();
  const currentTicketCount = ticketHistory[ticketHistory.length - 1];
  const lastMonthsTickets = ticketHistory[ticketHistory.length - 2];
  const difPercentage = Math.round(((currentTicketCount - lastMonthsTickets) / lastMonthsTickets) * 10000) / 100;
  return (
    <Card bg="success" text="white" className="mb-4">
      <CardBody className="pb-0 d-flex justify-content-between align-items-start">
        <div>
          <div className="fs-4 fw-semibold">
            {currentTicketCount}
            <span className="fs-6 ms-2 fw-normal">
              ({difPercentage}%
              {difPercentage > 0 ? <FontAwesomeIcon icon={faArrowUp} fixedWidth /> : <FontAwesomeIcon icon={faArrowDown} fixedWidth />}
              )
            </span>
          </div>
          <div>{dict.dashboard.featured.resolved_ticket_count}</div>
        </div>
      </CardBody>
      <div className="mt-3 mx-3" style={{ height: '70px' }}>
        <Line
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
                border: {
                  display: true,
                },
              },
              y: {
                min: 0,
                max: 150,
                display: false,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            elements: {
              line: {
                borderWidth: 1,
                tension: 0.4,
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
              },
            },
          }}
          data={{
            labels: monthHistory,
            datasets: [{
              label: 'Total Submitted Tickets',
              backgroundColor: 'transparent',
              borderColor: 'rgba(255,255,255,.55)',
              data: ticketHistory,
            }],
          }}
        />
      </div>
    </Card>
  )
}
