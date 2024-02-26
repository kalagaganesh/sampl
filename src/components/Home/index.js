import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {Link, Redirect} from 'react-router-dom'

import {IoMdHome, IoMdClose, IoIosSearch} from 'react-icons/io'
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
  PremiumContainer,
  WatchLogoImage,
  PrepaidPlanTxt,
  PrepaidPlanButton,
  CLoseButton,
  PremiumInnerContainer,
  HomeVideosContainer,
  SearchInput,
  SearchInputButton,
  HomeVideosMainContainer,
  ThumbnailImage,
  ProfileImage,
  AboutProfileContainer,
  Title,
  AboutMainContainer,
  Name,
  ViewCountContainer,
  ViewCount,
  UnorderedListContainer,
  SpanEle,
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
  empty: 'NO_VIDEOS',
}

class Home extends Component {
  state = {
    premiumPlanShow: true,
    homePageVideosList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideosList()
  }

  getVideosList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      if (data.videos.length > 0) {
        const formattedData = data.videos.map(eachItem => ({
          channel: {
            name: eachItem.channel.name,
            profileImageUrl: eachItem.channel.profile_image_url,
          },
          id: eachItem.id,
          publishedAt: eachItem.published_at,
          thumbnailUrl: eachItem.thumbnail_url,
          title: eachItem.title,
          viewCount: eachItem.view_count,
        }))
        this.setState({
          homePageVideosList: formattedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.empty,
        })
      }
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickPremiumPlanButton = () => {
    this.setState({premiumPlanShow: false})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getVideosList()
  }

  onClickEnterBtn = event => {
    if (event.key === 'Enter') {
      this.getVideosList()
    }
  }

  renderSuccessView = () => {
    const {homePageVideosList} = this.state
    return (
      <VideosContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const changeHeading = isDarkTheme ? '#ffffff' : '#1e293b'
          return (
            <UnorderedListContainer>
              {homePageVideosList.map(eachItem => (
                <Link
                  to={`/videos/${eachItem.id}`}
                  key={eachItem.id}
                  style={{textDecoration: 'none'}}
                >
                  <AboutMainContainer key={eachItem.id}>
                    <ThumbnailImage
                      alt={eachItem.channel.name}
                      src={eachItem.thumbnailUrl}
                    />
                    <AboutProfileContainer>
                      <ProfileImage
                        alt="profile"
                        src={eachItem.channel.profileImageUrl}
                      />
                      <div>
                        <Title color={changeHeading}>{eachItem.title}</Title>
                        <Name>{eachItem.channel.name}</Name>
                        <ViewCountContainer>
                          <ViewCount>
                            {eachItem.viewCount} views
                            <SpanEle>{eachItem.publishedAt}</SpanEle>
                          </ViewCount>
                        </ViewCountContainer>
                      </div>
                    </AboutProfileContainer>
                  </AboutMainContainer>
                </Link>
              ))}
            </UnorderedListContainer>
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
      case apiStatusConstants.empty:
        return this.renderEmptyListView()
      default:
        return null
    }
  }

  render() {
    const {premiumPlanShow, searchInput} = this.state
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

          const iconBgColor = activeTabId === 'Home' ? '#ff0b37' : ''
          const navigationBgColor = isDarkTheme ? '#424242' : ''
          const navigationTextColor = isDarkTheme ? '#ffffff' : '#424242'
          const changeBgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'

          return (
            <>
              <Header />
              <HomeMainContainer>
                <SelectContainer bgColor={navigationBgColor}>
                  <SelectOneItemContainer>
                    <Link to="/" style={{textDecoration: 'none'}}>
                      <EachSelectContainer onClick={onChangeHomeTabId}>
                        <IoMdHome color={iconBgColor} />
                        <DisplayText color={navigationTextColor}>
                          Home
                        </DisplayText>
                      </EachSelectContainer>
                    </Link>
                    <Link to="/trending" style={{textDecoration: 'none'}}>
                      <EachSelectContainer onClick={onChangeTrendingTabId}>
                        <HiFire />
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
                <HomeVideosContainer>
                  {premiumPlanShow && (
                    <PremiumContainer>
                      <PremiumInnerContainer>
                        <WatchLogoImage
                          alt="watch-logo"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        />
                        <PrepaidPlanTxt>
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </PrepaidPlanTxt>
                        <PrepaidPlanButton>GET IT NOW</PrepaidPlanButton>
                      </PremiumInnerContainer>
                      <CLoseButton onClick={this.onClickPremiumPlanButton}>
                        <IoMdClose />
                      </CLoseButton>
                    </PremiumContainer>
                  )}
                  <HomeVideosMainContainer bgColor={changeBgColor}>
                    <div>
                      <SearchInput
                        type="search"
                        placeholder="Search"
                        onChange={this.onChangeSearchInput}
                        value={searchInput}
                        onKeyDown={this.onClickEnterBtn}
                      />
                      <SearchInputButton
                        type="button"
                        aria-label="save"
                        onClick={this.onClickSearchButton}
                      >
                        <IoIosSearch />
                      </SearchInputButton>
                    </div>
                    {this.renderVideosView()}
                  </HomeVideosMainContainer>
                </HomeVideosContainer>
              </HomeMainContainer>
            </>
          )
        }}
      </VideosContext.Consumer>
    )
  }
}

export default Home
