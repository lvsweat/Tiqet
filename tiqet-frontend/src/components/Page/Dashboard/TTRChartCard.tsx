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
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

function getMonthHistory() {
  return ['November', 'December', 'January', 'February', 'March', 'April', 'May']
}

function getTimeHistory() {
  return [45, 34, 12, 35, 23, 58, 38]
}

interface Props {
  dict: any;
}

export default function TTRChartCard({ dict }: Props) {
  const monthHistory = getMonthHistory()
  const timeHistory = getTimeHistory()
  const currentTTC = timeHistory[timeHistory.length - 1]
  const lastMonthsTime = timeHistory[timeHistory.length - 2]
  const difPercentage = Math.round(((currentTTC - lastMonthsTime) / lastMonthsTime) * 10000) / 100
  return (
    <Card bg="danger" text="white" className="mb-4">
      <CardBody className="pb-0 d-flex justify-content-between align-items-start">
        <div>
          <div className="fs-4 fw-semibold">
            {currentTTC}
            min
            <span className="fs-6 ms-2 fw-normal">
              (
              {difPercentage}
              %
              {difPercentage > 0 ? <FontAwesomeIcon icon={faArrowUp} fixedWidth />
                : <FontAwesomeIcon icon={faArrowDown} fixedWidth />}
              )
            </span>
          </div>
          <div>{dict.dashboard.featured.time_to_resolution}</div>
        </div>
        <Dropdown align="end">
          <DropdownToggle
            as="button"
            bsPrefix="btn"
            className="btn-link rounded-0 text-white shadow-none p-0"
            id="dropdown-chart3"
          >
            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="#/action-1">{dict.dashboard.featured.action.action1}</DropdownItem>
            <DropdownItem href="#/action-2">{dict.dashboard.featured.action.action2}</DropdownItem>
            <DropdownItem href="#/action-3">{dict.dashboard.featured.action.action3}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
              label: 'Average Time To Completion',
              backgroundColor: 'transparent',
              borderColor: 'rgba(255,255,255,.55)',
              data: timeHistory,
            }],
          }}
        />
      </div>
    </Card>
  )
}
