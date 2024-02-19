import {Component} from 'react'

import ReactPlayer from 'react-player'

import Cookies from 'js-cookie'

import {Link, Redirect} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus, BiLike, BiDislike} from 'react-icons/bi'

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
  HomeVideosMainContainer,
  VideoContainer,
  Title,
  ViewCountContainer,
  ViewCount,
  LikeDislikeContainer,
  EachLikeDislikeContainer,
  EachText,
  ViewLikeContainer,
} from './styledComponents'

class VideoItemDetails extends Component {
  state = {videoDetails: {}}

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const formattedData = {
      channel: {
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
      },
      id: data.video_details.id,
      description: data.video_details.description,
      publishedAt: data.video_details.published_at,
      thumbnailUrl: data.video_details.thumbnail_url,
      title: data.video_details.title,
      viewCount: data.video_details.view_count,
      videoUrl: data.video_details.video_url,
    }
    this.setState({videoDetails: formattedData})
  }

  render() {
    const {videoDetails} = this.state
    const {videoUrl, channel, title, viewCount} = videoDetails
    const {name, profileImageUrl} = channel

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
          <HomeVideosMainContainer>
            <VideoContainer>
              <ReactPlayer width="100%" height="100%" url={videoUrl} controls />
            </VideoContainer>
            <Title>{title}</Title>
            <ViewLikeContainer>
              <ViewCountContainer>
                <ViewCount>{viewCount} views .</ViewCount>
              </ViewCountContainer>
              <LikeDislikeContainer>
                <EachLikeDislikeContainer>
                  <BiLike />
                  <EachText>Like</EachText>
                </EachLikeDislikeContainer>
                <EachLikeDislikeContainer>
                  <BiDislike />
                  <EachText>DisLike</EachText>
                </EachLikeDislikeContainer>
                <EachLikeDislikeContainer>
                  <BiListPlus />
                  <EachText>Save</EachText>
                </EachLikeDislikeContainer>
              </LikeDislikeContainer>
            </ViewLikeContainer>
            <hr />
            <div>
              <img src={profileImageUrl} />
            </div>
          </HomeVideosMainContainer>
        </HomeMainContainer>
      </>
    )
  }
}

export default VideoItemDetails
