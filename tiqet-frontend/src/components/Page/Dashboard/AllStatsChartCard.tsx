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
import useComputedStyle from '@/hooks/use-computed-style'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

function getMonthHistory() {
  return ['November', 'December', 'January', 'February', 'March', 'April', 'May']
}

function getTicketHistory() {
  return [52, 28, 32, 84, 51, 55, 73]
}

function getResolvedTicketHistory() {
  return [50, 30, 27, 84, 52, 50, 62]
}

function getAcceptTimeHistory() {
  return [18, 15, 8, 3, 5, 4, 2]
}

function getTTRTimeHistory() {
  return [45, 34, 12, 35, 23, 58, 38]
}

export default function AllStatsChartCard() {
  const borderColor = useComputedStyle('--bs-border-color')
  const bodyColor = useComputedStyle('--bs-body-color')
  const monthHistory = getMonthHistory()
  const ticketHistory = getTicketHistory()
  const resTicketHistory = getResolvedTicketHistory()
  const acceptTimeHistory = getAcceptTimeHistory()
  const tTRTimeHistory = getTTRTimeHistory()

  return (
    <Line
      data={{
        labels: monthHistory,
        datasets: [{
          label: 'Submitted tickets',
          backgroundColor: 'rgba(37, 150, 255, 0.2)',
          borderColor: 'rgb(37, 150, 255)',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: ticketHistory,
          fill: true,
        }, {
          label: 'Resolved tickets',
          backgroundColor: 'rgba(34, 211, 72, 0.2)',
          borderColor: 'rgb(34, 211, 72)',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: resTicketHistory,
          fill: true,
        }, {
          label: 'Average acceptance time (in minutes)',
          backgroundColor: 'rgba(235, 181, 80, 0.2)',
          borderColor: 'rgb(235, 181, 80)',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: acceptTimeHistory,
          fill: true,
        }, {
          label: 'Average resolution time (in minutes)',
          backgroundColor: 'rgba(252, 74, 74, 0.2)',
          borderColor: 'rgb(252, 74, 74)',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: tTRTimeHistory,
          fill: true,
        }],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              color: borderColor,
              drawOnChartArea: false,
            },
            ticks: {
              color: bodyColor,
            },
          },
          y: {
            beginAtZero: true,
            border: {
              color: borderColor,
            },
            grid: {
              color: borderColor,
            },
            max: 250,
            ticks: {
              color: bodyColor,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          },
        },
      }}
    />
  )
}
