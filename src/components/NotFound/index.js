import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link, Redirect} from 'react-router-dom'

import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import Header from '../Header'

import VideosContext from '../../context/VideosContext'

import {
  EachSelectContainer,
  DisplayText,
  SelectOneItemContainer,
  SelectContainer,
  LogoContainer,
  Logo,
  ContactContainer,
  ContactText,
  HomeMainContainer,
  TrendingMainContainer,
  NotFoundHeading,
  NotFoundPara,
  NotFoundImage,
} from './styledComponents'

class NotFound extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <VideosContext.Consumer>
        {value => {
          const {activeTabId, changeTabId, isDarkTheme} = value
          const onChangeHomeTabId = () => {
            changeTabId('Home')
          }
          const onChangeTrendingTabId = () => {
            changeTabId('Trending')
          }
          const onChangeGamingTabId = () => {
            changeTabId('Gaming')
          }
          const onChangeSavedVideosTabId = () => {
            changeTabId('SavedVideos')
          }

          const iconBgColor = activeTabId === 'Trending' ? '#ff0b37' : ''
          const navigationBgColor = isDarkTheme ? '#424242' : ''
          const navigationTextColor = isDarkTheme ? '#ffffff' : '#424242'
          const changeNotFoundImage = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
          const changeNotFoundHeading = isDarkTheme ? '#ffffff' : '#1e293b'
          const changeBgColor = isDarkTheme ? '#0f0f0f' : '#ffffff'

          return (
            <>
              <Header />
              <HomeMainContainer>
                <SelectContainer bgColor={navigationBgColor}>
                  <SelectOneItemContainer>
                    <Link to="/" style={{textDecoration: 'none'}}>
                      <EachSelectContainer onClick={onChangeHomeTabId}>
                        <IoMdHome />
                        <DisplayText color={navigationTextColor}>
                          Home
                        </DisplayText>
                      </EachSelectContainer>
                    </Link>
                    <Link to="/trending" style={{textDecoration: 'none'}}>
                      <EachSelectContainer onClick={onChangeTrendingTabId}>
                        <HiFire color={iconBgColor} />
                        <DisplayText color={navigationTextColor}>
                          Trending
                        </DisplayText>
                      </EachSelectContainer>
                    </Link>
                    <Link to="/gaming" style={{textDecoration: 'none'}}>
                      <EachSelectContainer onClick={onChangeGamingTabId}>
                        <SiYoutubegaming />
                        <DisplayText color={navigationTextColor}>
                          Gaming
                        </DisplayText>
                      </EachSelectContainer>
                    </Link>
                    <Link to="/saved-videos" style={{textDecoration: 'none'}}>
                      <EachSelectContainer onClick={onChangeSavedVideosTabId}>
                        <BiListPlus />
                        <DisplayText color={navigationTextColor}>
                          Saved Videos
                        </DisplayText>
                      </EachSelectContainer>
                    </Link>
                  </SelectOneItemContainer>
                  <ContactContainer>
                    <ContactText color={navigationTextColor}>
                      CONTACT US
                    </ContactText>
                    <LogoContainer>
                      <Logo
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                        alt="facebook logo"
                      />
                      <Logo
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                        alt="twitter logo"
                      />
                      <Logo
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                        alt="linked in logo"
                      />
                    </LogoContainer>
                    <ContactText color={navigationTextColor}>
                      Enjoy! Now to see your channels and recommendations!
                    </ContactText>
                  </ContactContainer>
                </SelectContainer>
                <TrendingMainContainer bgColor={changeBgColor}>
                  <NotFoundImage alt="not found" src={changeNotFoundImage} />
                  <NotFoundHeading color={changeNotFoundHeading}>
                    Page Not Found
                  </NotFoundHeading>
                  <NotFoundPara>
                    we are sorry, the page you requested could not be found.
                  </NotFoundPara>
                </TrendingMainContainer>
              </HomeMainContainer>
            </>
          )
        }}
      </VideosContext.Consumer>
    )
  }
}

export default NotFound
