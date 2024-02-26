import {Component} from 'react'

import './App.css'

import {Route, Switch} from 'react-router-dom'

import VideoContext from './context/VideosContext'

import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

class App extends Component {
  state = {savedVideosList: [], activeTabId: 'Home', isDarkTheme: false}

  updateVideoList = video => {
    const {savedVideosList} = this.state
    const videoExist = savedVideosList.findIndex(
      eachItem => eachItem.id === video.id,
    )
    if (videoExist === -1) {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, video],
      }))
    } else {
      savedVideosList.splice(videoExist, 1)
      this.setState({savedVideosList})
    }
  }

  changeTabId = value => {
    this.setState({activeTabId: value})
  }

  changeTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  render() {
    const {savedVideosList, activeTabId, isDarkTheme} = this.state
    console.log(isDarkTheme)
    return (
      <VideoContext.Provider
        value={{
          savedVideosList,
          updateVideoList: this.updateVideoList,
          activeTabId,
          changeTabId: this.changeTabId,
          isDarkTheme,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/videos/:id" component={VideoItemDetails} />
          <Route exact component={NotFound} />
        </Switch>
      </VideoContext.Provider>
    )
  }
}

export default App
