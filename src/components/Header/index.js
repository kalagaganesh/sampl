import {Link, withRouter} from 'react-router-dom'

import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import {FaMoon} from 'react-icons/fa'
import {RiSunLine} from 'react-icons/ri'

import VideosContext from '../../context/VideosContext'

import {
  Navbar,
  WatchLogoImage,
  LightThemeButton,
  ProfileImage,
  LogoutButton,
  NavbarInnerContainer,
  WatchLogoButton,
  PopupContainer,
  PopupHeading,
  PopupCloseBtn,
  PopupLogoutBtn,
} from './styledComponents'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <VideosContext.Consumer>
      {value => {
        const {isDarkTheme, changeTabId, changeTheme} = value
        const onClickHomeTabId = () => {
          changeTabId('Home')
        }
        const changeThemeBtn = () => {
          changeTheme()
        }
        const changeThemeImage = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        const navbarBgColor = isDarkTheme ? '#424242' : ''
        const logoutBtnBgColor = isDarkTheme ? '#ffffff' : '#3b82f6'
        const logoutBtnColor = isDarkTheme ? '#ffffff' : '#3b82f6'

        return (
          <Navbar bgColor={navbarBgColor}>
            <Link to="/">
              <WatchLogoButton onClick={onClickHomeTabId}>
                <WatchLogoImage alt="watch-logo" src={changeThemeImage} />
              </WatchLogoButton>
            </Link>
            <NavbarInnerContainer>
              <LightThemeButton onClick={changeThemeBtn} data-testid="theme">
                {isDarkTheme ? <RiSunLine color="#ffffff" /> : <FaMoon />}
              </LightThemeButton>
              <ProfileImage
                alt="profile"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
              />
              <Popup
                modal
                trigger={
                  <LogoutButton
                    color={logoutBtnColor}
                    bgColor={logoutBtnBgColor}
                    type="button"
                    onClick={onClickLogout}
                  >
                    Logout
                  </LogoutButton>
                }
              >
                {close => (
                  <PopupContainer>
                    <PopupHeading>
                      Are you sure, you want to logout?
                    </PopupHeading>
                    <div>
                      <PopupCloseBtn onClick={() => close()} type="button">
                        Cancel
                      </PopupCloseBtn>
                      <PopupLogoutBtn onClick={onClickLogout} type="button">
                        Confirm
                      </PopupLogoutBtn>
                    </div>
                  </PopupContainer>
                )}
              </Popup>
            </NavbarInnerContainer>
          </Navbar>
        )
      }}
    </VideosContext.Consumer>
  )
}

export default withRouter(Header)
