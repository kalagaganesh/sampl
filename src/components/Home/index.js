import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link, Redirect} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import {IoMdHome, IoMdClose, IoIosSearch} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import Header from '../Header'

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
} from './styledComponents'

class Home extends Component {
  state = {premiumPlanShow: true, homePageVideosList: [], searchInput: ''}

  componentDidMount() {
    this.getVideosList()
  }

  getVideosList = async () => {
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
    const data = await response.json()
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
    this.setState({homePageVideosList: formattedData})
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

  render() {
    const {premiumPlanShow, homePageVideosList, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <HomeMainContainer>
          <SelectContainer>
            <SelectOneItemContainer>
              <Link to="/" style={{textDecoration: 'none'}}>
                <EachSelectContainer>
                  <IoMdHome />
                  <DisplayText>Home</DisplayText>
                </EachSelectContainer>
              </Link>
              <Link to="/trending" style={{textDecoration: 'none'}}>
                <EachSelectContainer>
                  <HiFire />
                  <DisplayText>Trending</DisplayText>
                </EachSelectContainer>
              </Link>
              <Link to="/gaming" style={{textDecoration: 'none'}}>
                <EachSelectContainer>
                  <SiYoutubegaming />
                  <DisplayText>Gaming</DisplayText>
                </EachSelectContainer>
              </Link>
              <Link to="/saved-videos" style={{textDecoration: 'none'}}>
                <EachSelectContainer>
                  <BiListPlus />
                  <DisplayText>Saved Videos</DisplayText>
                </EachSelectContainer>
              </Link>
            </SelectOneItemContainer>
            <ContactContainer>
              <ContactText>CONTACT US</ContactText>
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
              <ContactText>
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
            <HomeVideosMainContainer>
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
                          <Title>{eachItem.title}</Title>
                          <Name>{eachItem.channel.name}</Name>
                          <ViewCountContainer>
                            <ViewCount>{eachItem.viewCount} views .</ViewCount>
                            <p>
                              {formatDistanceToNow(
                                new Date(eachItem.publishedAt),
                              )}
                            </p>
                          </ViewCountContainer>
                        </div>
                      </AboutProfileContainer>
                    </AboutMainContainer>
                  </Link>
                ))}
              </UnorderedListContainer>
            </HomeVideosMainContainer>
          </HomeVideosContainer>
        </HomeMainContainer>
      </>
    )
  }
}

export default Home
