import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link, Redirect} from 'react-router-dom'

import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

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
  GamingHeader,
  GamingLogo,
  GamingText,
  TrendingMainContainer,
  TrendingVideoContainer,
  EachTrendingVideoContainer,
  TrendingThumbnailImage,
  TrendingDetailsContainer,
  TrendingName,
  TrendingTitle,
  TrendingCountContainer,
  TrendingSpanEle,
  FailureImage,
  FailureContainer,
  FailureBtn,
  FailureHeading,
  FailurePara,
  LoaderContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {trendingList: []}

  componentDidMount() {
    this.getGamingList()
  }

  getGamingList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
        name: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
        publishedAt: eachItem.published_at,
      }))
      this.setState({
        trendingList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {trendingList} = this.state
    return (
      <VideosContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const changeBgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
          const changeHeading = isDarkTheme ? '#ffffff' : '#1e293b'
          return (
            <TrendingVideoContainer
              bgColor={changeBgColor}
              data-testid="savedVideos"
            >
              {trendingList.map(eachItem => (
                <Link
                  style={{textDecoration: 'none'}}
                  to={`/videos/${eachItem.id}`}
                  key={eachItem.id}
                >
                  <EachTrendingVideoContainer key={eachItem.id}>
                    <TrendingThumbnailImage
                      alt="trending"
                      src={eachItem.thumbnailUrl}
                    />
                    <TrendingDetailsContainer>
                      <TrendingTitle color={changeHeading}>
                        {eachItem.title}
                      </TrendingTitle>
                      <TrendingName>{eachItem.name}</TrendingName>
                      <TrendingCountContainer>
                        {eachItem.viewCount} views{' '}
                        <TrendingSpanEle>
                          {eachItem.publishedAt}
                        </TrendingSpanEle>
                      </TrendingCountContainer>
                    </TrendingDetailsContainer>
                  </EachTrendingVideoContainer>
                </Link>
              ))}
            </TrendingVideoContainer>
          )
        }}
      </VideosContext.Consumer>
    )
  }

  onClickFailureRetryBtn = () => {
    this.getVideosList()
  }

  onClickRetryBtn = () => {
    this.getVideosList()
  }

  renderFailureView = () => (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
        alt="failure view"
      />
      <FailureHeading>Oops! Something Went Wrong</FailureHeading>
      <FailurePara>
        We are having some trouble to complete your request.
      </FailurePara>
      <FailurePara>Please try again</FailurePara>
      <FailureBtn onClick={this.onClickFailureRetryBtn}>Retry</FailureBtn>
    </FailureContainer>
  )

  renderEmptyListView = () => (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <FailureHeading>No Search Results Found</FailureHeading>
      <FailurePara>Try different key words or remove search filter</FailurePara>
      <FailureBtn onClick={this.onClickRetryBtn}>Retry</FailureBtn>
    </FailureContainer>
  )

  renderLoaderView = () => (
    <LoaderContainer className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </LoaderContainer>
  )

  renderVideosView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

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
          const trendingHeaderColor = isDarkTheme ? '#231f20' : '#e2e8f0'

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
                <TrendingMainContainer>
                  <GamingHeader bgColor={trendingHeaderColor}>
                    <GamingLogo>
                      <HiFire />
                    </GamingLogo>
                    <GamingText color={navigationTextColor}>
                      Trending
                    </GamingText>
                  </GamingHeader>
                  {this.renderVideosView()}
                </TrendingMainContainer>
              </HomeMainContainer>
            </>
          )
        }}
      </VideosContext.Consumer>
    )
  }
}

export default Trending
