import {Component} from 'react'

import ReactPlayer from 'react-player'

import Cookies from 'js-cookie'

import {Link, Redirect} from 'react-router-dom'

import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus, BiLike, BiDislike} from 'react-icons/bi'

import VideoContext from '../../context/VideosContext'

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
  ViewLikeContainer,
  SpanEle,
  ProfileImage,
  DescriptionContainer,
  NameEle,
  Subscribers,
} from './styledComponents'

class VideoItemDetails extends Component {
  state = {videoDetails: {}, liked: false, disliked: false}

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
      name: data.video_details.channel.name,
      profileImageUrl: data.video_details.channel.profile_image_url,
      subscriberCount: data.video_details.channel.subscriber_count,
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

  onClickLikeBtn = () => {
    this.setState(prevState => ({
      liked: !prevState.liked,
      disliked: false,
    }))
  }

  onClickDislikeBtn = () => {
    this.setState(prevState => ({
      liked: false,
      disliked: !prevState.disliked,
    }))
  }

  render() {
    const {videoDetails, liked, disliked} = this.state
    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      profileImageUrl,
      name,
      subscriberCount,
      description,
    } = videoDetails

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const likeClassName = liked ? '#00306e' : '#383838'
    const disLikeClassName = disliked ? '#00306e' : '#383838'
    return (
      <VideoContext.Consumer>
        {value => {
          const {savedVideosList, updateVideoList, isDarkTheme} = value
          const onClickSaveVideo = () => {
            updateVideoList(videoDetails)
          }
          const videoAlreadySaved = savedVideosList.findIndex(
            eachItem => eachItem.id === videoDetails.id,
          )
          let isSaved
          if (videoAlreadySaved === -1) {
            isSaved = false
          } else {
            isSaved = true
          }
          const colorClassName = isSaved ? '#00306e' : '#383838'
          const changeBgColor = isDarkTheme ? ' #0f0f0f' : '#f9f9f9'
          const navigationBgColor = isDarkTheme ? '#424242' : ''
          const navigationTextColor = isDarkTheme ? '#ffffff' : '#424242'

          return (
            <>
              <Header />
              <HomeMainContainer>
                <SelectContainer bgColor={navigationBgColor}>
                  <SelectOneItemContainer>
                    <Link to="/" style={{textDecoration: 'none'}}>
                      <EachSelectContainer>
                        <IoMdHome />
                        <DisplayText color={navigationTextColor}>
                          Home
                        </DisplayText>
                      </EachSelectContainer>
                    </Link>
                    <Link to="/trending" style={{textDecoration: 'none'}}>
                      <EachSelectContainer>
                        <HiFire />
                        <DisplayText color={navigationTextColor}>
                          Trending
                        </DisplayText>
                      </EachSelectContainer>
                    </Link>
                    <Link to="/gaming" style={{textDecoration: 'none'}}>
                      <EachSelectContainer>
                        <SiYoutubegaming />
                        <DisplayText color={navigationTextColor}>
                          Gaming
                        </DisplayText>
                      </EachSelectContainer>
                    </Link>
                    <Link to="/saved-videos" style={{textDecoration: 'none'}}>
                      <EachSelectContainer>
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
                <HomeVideosMainContainer
                  bgColor={changeBgColor}
                  data-testid="videoItemDetails"
                >
                  <VideoContainer data-testid="videoItemDetails">
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      url={videoUrl}
                      controls
                    />
                  </VideoContainer>
                  <Title color={navigationTextColor}>{title}</Title>
                  <ViewLikeContainer>
                    <ViewCountContainer>
                      <ViewCount color={navigationTextColor}>
                        {viewCount} views <SpanEle>{publishedAt}</SpanEle>
                      </ViewCount>
                    </ViewCountContainer>
                    <LikeDislikeContainer>
                      <EachLikeDislikeContainer
                        color={likeClassName}
                        onClick={this.onClickLikeBtn}
                      >
                        <BiLike /> Like
                      </EachLikeDislikeContainer>
                      <EachLikeDislikeContainer
                        color={disLikeClassName}
                        onClick={this.onClickDislikeBtn}
                      >
                        <BiDislike /> DisLike
                      </EachLikeDislikeContainer>
                      {isSaved ? (
                        <EachLikeDislikeContainer
                          onClick={onClickSaveVideo}
                          color={colorClassName}
                        >
                          <BiListPlus /> Saved
                        </EachLikeDislikeContainer>
                      ) : (
                        <EachLikeDislikeContainer
                          onClick={onClickSaveVideo}
                          color={colorClassName}
                        >
                          <BiListPlus /> Save
                        </EachLikeDislikeContainer>
                      )}
                    </LikeDislikeContainer>
                  </ViewLikeContainer>
                  <hr />
                  <DescriptionContainer>
                    <ProfileImage alt="profile" src={profileImageUrl} />
                    <div>
                      <NameEle color={navigationTextColor}>{name}</NameEle>
                      <Subscribers color={navigationTextColor}>
                        {subscriberCount} subscribers
                      </Subscribers>
                      <NameEle color={navigationTextColor}>
                        {description}
                      </NameEle>
                    </div>
                  </DescriptionContainer>
                </HomeVideosMainContainer>
              </HomeMainContainer>
            </>
          )
        }}
      </VideoContext.Consumer>
    )
  }
}

export default VideoItemDetails
