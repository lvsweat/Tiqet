import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faDownload,
  faEllipsisVertical,
  faMars,
  faSearch,
  faUsers,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'
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
import {
  faCcAmex,
  faCcApplePay,
  faCcPaypal,
  faCcStripe,
  faCcVisa,
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import React from 'react'
import TicketsChartCard from '@/components/Page/Dashboard/TicketsChartCard'
import AcceptanceChartCard from '@/components/Page/Dashboard/AcceptanceChartCard'
import TTRChartCard from '@/components/Page/Dashboard/TTRChartCard'
import ResolvedTicketsChartCard from '@/components/Page/Dashboard/ResolvedTicketsChartCard'
import AllStatsChartCard from '@/components/Page/Dashboard/AllStatsChartCard'
import { getDictionary } from '@/locales/dictionary'

export const metadata = {
  title: "Dashboard | Tiqet",
  description: "The main Tiqet dashboard"
}

function getMonthHistory() {
  return ['November', 'December', 'January', 'February', 'March', 'April', 'May'];
}

export default async function Page() {
  const dict = await getDictionary()
  const monthHistory = getMonthHistory();

  return (
    <div>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <TicketsChartCard dict={dict} />
        </div>

        <div className="col-sm-6 col-lg-3">
          <ResolvedTicketsChartCard dict={dict}/>
        </div>

        <div className="col-sm-6 col-lg-3">
          <AcceptanceChartCard dict={dict} />
        </div>

        <div className="col-sm-6 col-lg-3">
          <TTRChartCard dict={dict} />
        </div>
      </div>

      <Card className="mb-4">
        <CardBody>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="mb-0">{dict.dashboard.all_stats.title}</h4>
              <div className="small text-black-50 dark:text-gray-500">{monthHistory[0]} - {monthHistory[monthHistory.length - 1]} {new Date().getFullYear()}</div>
            </div>
            <div className="d-none d-md-block">
              <Button variant="primary">
                <FontAwesomeIcon icon={faDownload} fixedWidth />
              </Button>
            </div>
          </div>
          <div
            style={{
              height: '300px',
              marginTop: '40px',
            }}
          >
            <AllStatsChartCard />
          </div>
        </CardBody>
      </Card>

      <div className="row">
        <div className="col-md-12">
          <Card>
            <CardHeader>
              {dict.dashboard.weekly_stats.title}
            </CardHeader>
            <CardBody>
              <div className="row">
                <div className="col-6">
                  <div className="border-start border-4 border-info px-3 mb-3">
                    <small className="text-black-50 dark:text-gray-500">
                      {dict.dashboard.weekly_stats.stats.tickets}
                    </small>
                    <div className="fs-5 fw-semibold">12</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="border-start border-4 border-danger px-3 mb-3">
                    <small className="text-black-50 dark:text-gray-500">
                      {dict.dashboard.weekly_stats.stats.acceptance_time}
                    </small>
                    <div className="fs-5 fw-semibold">4min</div>
                  </div>
                </div>
              </div>

              <hr className="mt-0" />

              <div className="row mb-4 align-items-center">
                <div className="col-3">
                  <span className="text-black-50 dark:text-gray-500 small">
                    {dict.dashboard.weekly_stats.monday}
                  </span>
                </div>
                <div className="col">
                  <ProgressBar
                    className="progress-thin mb-1"
                    variant="primary"
                    now={34}
                  />
                  <ProgressBar
                    className="progress-thin"
                    variant="danger"
                    now={78}
                  />
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <div className="col-3">
                  <span className="text-black-50 dark:text-gray-500 small">
                    {dict.dashboard.weekly_stats.tuesday}
                  </span>
                </div>
                <div className="col">
                  <ProgressBar
                    className="progress-thin mb-1"
                    variant="primary"
                    now={56}
                  />
                  <ProgressBar
                    className="progress-thin"
                    variant="danger"
                    now={94}
                  />
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <div className="col-3">
                  <span className="text-black-50 dark:text-gray-500 small">
                    {dict.dashboard.weekly_stats.wednesday}
                  </span>
                </div>
                <div className="col">
                  <ProgressBar
                    className="progress-thin mb-1"
                    variant="primary"
                    now={12}
                  />
                  <ProgressBar
                    className="progress-thin"
                    variant="danger"
                    now={67}
                  />
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <div className="col-3">
                  <span className="text-black-50 dark:text-gray-500 small">
                    {dict.dashboard.weekly_stats.thursday}
                  </span>
                </div>
                <div className="col">
                  <ProgressBar
                    className="progress-thin mb-1"
                    variant="primary"
                    now={43}
                  />
                  <ProgressBar
                    className="progress-thin"
                    variant="danger"
                    now={91}
                  />
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <div className="col-3">
                  <span className="text-black-50 dark:text-gray-500 small">
                    {dict.dashboard.weekly_stats.friday}
                  </span>
                </div>
                <div className="col">
                  <ProgressBar
                    className="progress-thin mb-1"
                    variant="primary"
                    now={22}
                  />
                  <ProgressBar
                    className="progress-thin"
                    variant="danger"
                    now={73}
                  />
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <div className="col-3">
                  <span className="text-black-50 dark:text-gray-500 small">
                    {dict.dashboard.weekly_stats.saturday}
                  </span>
                </div>
                <div className="col">
                  <ProgressBar
                    className="progress-thin mb-1"
                    variant="primary"
                    now={53}
                  />
                  <ProgressBar
                    className="progress-thin"
                    variant="danger"
                    now={82}
                  />
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <div className="col-3">
                  <span className="text-black-50 dark:text-gray-500 small">
                    {dict.dashboard.weekly_stats.sunday}
                  </span>
                </div>
                <div className="col">
                  <ProgressBar
                    className="progress-thin mb-1"
                    variant="primary"
                    now={9}
                  />
                  <ProgressBar
                    className="progress-thin"
                    variant="danger"
                    now={69}
                  />
                </div>
              </div>

              <br />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
