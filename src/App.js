import './App.css'

import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/videos/:id" component={VideoItemDetails} />
    </Switch>
  </>
)

export default App
