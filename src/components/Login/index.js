import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import {
  LoginBgContainer,
  FormMainContainer,
  WatchLogoImage,
  UsernameContainer,
  PasswordContainer,
  LabelEle,
  InputEle,
  InputCheckbox,
  LabelShowPassword,
  LoginButton,
  CheckboxContainer,
  ErrorMsg,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  render() {
    const {
      username,
      password,
      errorMsg,
      showErrorMsg,
      showPassword,
    } = this.state
    const passwordType = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <LoginBgContainer>
        <FormMainContainer onSubmit={this.onSubmitForm}>
          <WatchLogoImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <UsernameContainer>
            <LabelEle htmlFor="username">USERNAME</LabelEle>
            <InputEle
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsernameInput}
            />
          </UsernameContainer>
          <PasswordContainer>
            <LabelEle htmlFor="password">PASSWORD</LabelEle>
            <InputEle
              type={passwordType}
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePasswordInput}
            />
          </PasswordContainer>
          <CheckboxContainer>
            <InputCheckbox
              id="checkbox"
              type="checkbox"
              onChange={this.onChangeCheckbox}
            />
            <LabelShowPassword htmlFor="checkbox">
              Show Password
            </LabelShowPassword>
          </CheckboxContainer>
          <LoginButton type="submit">Login</LoginButton>
          {showErrorMsg && <ErrorMsg>*{errorMsg}</ErrorMsg>}
        </FormMainContainer>
      </LoginBgContainer>
    )
  }
}

export default Login
