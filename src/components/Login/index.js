import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
    submitErr: false,
  }

  onSubmitSuccessHandler = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  onSubmitFailureHandler = errorMsg => {
    this.setState({
      submitErr: true,
      errMsg: errorMsg,
    })
  }

  onFormSubmit = async ev => {
    ev.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        this.onSubmitSuccessHandler(data.jwt_token)
      } else {
        this.onSubmitFailureHandler(data.error_msg)
      }
    } catch (error) {
      console.error('Error while fetching user datails')
    }
  }

  usernameHandler = ev => {
    this.setState({username: ev.target.value})
  }

  passwordHandler = ev => {
    this.setState({password: ev.target.value})
  }

  render() {
    const {username, password, errMsg, submitErr} = this.state
    // console.log(username)
    // console.log(password)

    return (
      <div className="login-container">
        <div className="login-info-section">
          <h2>Welcome to 👋</h2>
          <h1 className="login-header">UNI Resto Cafe </h1>
        </div>
        <div className="login-section">
          <form onSubmit={this.onFormSubmit} className="form">
            <h2>Login </h2>
            <div className="input-section">
              <label className="labels" htmlFor="username">
                USERNAME
              </label>
              <input
                value={username}
                onChange={this.usernameHandler}
                id="username"
                type="text"
                className="inputs"
                placeholder="Enter your Username"
              />
            </div>
            <div className="input-section">
              <label className="labels" htmlFor="password">
                PASSWORD
              </label>
              <input
                value={password}
                onChange={this.passwordHandler}
                id="password"
                type="password"
                className="inputs"
                placeholder="Enter your Password"
              />
            </div>
            <button className="btn-grad" type="submit">
              Login{' '}
            </button>
            {submitErr && <p className="errorMsg">{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
