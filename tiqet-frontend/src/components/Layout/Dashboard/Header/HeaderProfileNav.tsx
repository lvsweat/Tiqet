import {
  Badge,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressCard,
  faBell,
} from '@fortawesome/free-regular-svg-icons'
import { PropsWithChildren } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faGear, faPowerOff,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import HeaderLogout from '@/components/Layout/Dashboard/Header/HeaderLogout'
import { getDictionary } from '@/locales/dictionary'

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren

const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  )
}

export default async function HeaderProfileNav() {
  const dict = await getDictionary()

  return (
    <Nav>
      <Dropdown as={NavItem}>
        <DropdownToggle variant="link" bsPrefix="hide-caret" className="py-0 px-2 rounded-0" id="dropdown-profile">
          <div className="avatar position-relative">
          </div>
        </DropdownToggle>
        <DropdownMenu className="pt-0">
          <DropdownHeader className="fw-bold rounded-top">{dict.profile.general.title}</DropdownHeader>
          <Link href="#" passHref legacyBehavior>
            <DropdownItem>
              <ItemWithIcon icon={faBell}>
                {dict.profile.general.items.notifs}
                <Badge bg="danger" className="ms-2">5</Badge>
              </ItemWithIcon>
            </DropdownItem>
          </Link>

          <DropdownHeader className="fw-bold">{dict.profile.other.title}</DropdownHeader>

          <Link href="/profile" passHref legacyBehavior>
            <DropdownItem>
              <ItemWithIcon icon={faAddressCard}>{dict.profile.other.items.account}</ItemWithIcon>
            </DropdownItem>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <DropdownItem>
              <ItemWithIcon icon={faGear}>{dict.profile.other.items.settings}</ItemWithIcon>
            </DropdownItem>
          </Link>

          <DropdownDivider />

          <HeaderLogout>
            <DropdownItem>
              <ItemWithIcon icon={faPowerOff}>{dict.profile.logout}</ItemWithIcon>
            </DropdownItem>
          </HeaderLogout>
        </DropdownMenu>
      </Dropdown>
    </Nav>
  )
}
