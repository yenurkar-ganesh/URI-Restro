import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (!token) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
