import { connect } from 'react-redux'
import Login from '../components/Login'
import { login } from '../actions'

const mapStateToProps = (state) => ({
  authentication: state.authentication,
  err: state.err && state.err.message ? state.err.message : JSON.stringify(state.err, null, 2),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogin: (username, password) =>
    dispatch(login(username, password)),
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginContainer;