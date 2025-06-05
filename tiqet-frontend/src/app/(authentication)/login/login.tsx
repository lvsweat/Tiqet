'use client'

import {
  Alert, Button, Col, Form, FormControl, InputGroup, Row,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import InputGroupText from 'react-bootstrap/InputGroupText'
import { useRouter } from 'next/navigation'
import useDictionary from '@/locales/dictionary-hook'

export default function Login() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const dict = useDictionary()

  const login = async (formData: FormData) => {
    setSubmitting(true)

    try {
      const username = formData.get('username')
      const password = formData.get('password')
      const authResp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      })

      if (authResp.status === 404) {
        throw new Error('Invalid username or password')
      } else if (authResp.status !== 200) {
        throw new Error('Something went wrong with the backend!')
      }

      router.replace('/')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Alert
        variant="danger"
        show={error !== ''}
        onClose={() => setError('')}
        dismissible
      >
        {error}
      </Alert>
      <Form action={login}>
        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon
              icon={faUser}
              fixedWidth
            />
          </InputGroupText>
          <FormControl
            name="username"
            required
            disabled={submitting}
            placeholder={dict.login.form.username}
            aria-label="Username"
            defaultValue=""
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon
              icon={faLock}
              fixedWidth
            />
          </InputGroupText>
          <FormControl
            type="password"
            name="password"
            required
            disabled={submitting}
            placeholder={dict.login.form.password}
            aria-label="Password"
            defaultValue=""
          />
        </InputGroup>

        <Row className="align-items-center">
          <Col xs={6}>
            <Button
              className="px-4"
              variant="primary"
              type="submit"
              disabled={submitting}
            >
              {dict.login.form.submit}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}
