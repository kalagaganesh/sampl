import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FaMoon} from 'react-icons/fa'

import {
  Navbar,
  WatchLogoImage,
  LightThemeButton,
  ProfileImage,
  LogoutButton,
  NavbarInnerContainer,
  WatchLogoButton,
} from './styledComponents'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <Navbar>
      <Link to="/">
        <WatchLogoButton>
          <WatchLogoImage
            alt="watch-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          />
        </WatchLogoButton>
      </Link>
      <NavbarInnerContainer>
        <LightThemeButton>
          <FaMoon />
        </LightThemeButton>
        <ProfileImage
          alt="profile"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
        />
        <LogoutButton type="button" onClick={onClickLogout}>
          Logout
        </LogoutButton>
      </NavbarInnerContainer>
    </Navbar>
  )
}

export default withRouter(Header)
