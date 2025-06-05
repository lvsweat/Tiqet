import { Col, Row } from 'react-bootstrap'
import LoginForm from '@/app/(authentication)/login/login'
import { getDictionary } from '@/locales/dictionary'

export const metadata = {
  title: 'Login | Tiqet',
  description: 'Login to your local Tiqet account',
}

export default async function Page() {
  const dict = await getDictionary()

  return (
    <Row className="justify-content-center align-items-center px-3">
      <Col lg={8}>
        <Row>
          <Col md={7} className="bg-white dark:bg-dark border p-5">
            <div>
              <h1>{dict.login.title}</h1>
              <p className="text-black-50 dark:text-gray-500">{dict.login.description}</p>

              <LoginForm />
            </div>
          </Col>
          <Col
            md={5}
            className="bg-primary text-white d-flex align-items-center justify-content-center p-5"
          >
            <div className="text-center">
              <h2>{dict.login.signup.title}</h2>
              <p>{dict.login.signup.description}</p>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
