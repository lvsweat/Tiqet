import { Container } from 'react-bootstrap'
import HeaderSidebarToggler from '@/components/Layout/Dashboard/Header/HeaderSidebarToggler'
import HeaderNotificationNav from '@/components/Layout/Dashboard/Header/HeaderNotificationNav'
import HeaderProfileNav from '@/components/Layout/Dashboard/Header/HeaderProfileNav'

export default async function Header() {
  return (
    <header className="header sticky-top mb-4 py-2 px-sm-2 border-bottom">
      <Container fluid className="header-navbar d-flex align-items-center px-0">
        <HeaderSidebarToggler />
        <div className="header-nav ms-auto">
          <HeaderNotificationNav />
        </div>
        <div className="header-nav ms-2">
          <HeaderProfileNav />
        </div>
      </Container>
    </header>
  )
}
