import React from 'react'

const VideosContext = React.createContext({
  savedVideosList: [],
  updateVideoList: () => {},
  activeTabId: 'Home',
  changeTabId: () => {},
  isDarkTheme: false,
  changeTheme: () => {},
})

export default VideosContext
