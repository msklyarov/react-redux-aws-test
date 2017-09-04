import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
});

const AppContainer = connect(
  mapStateToProps,
)(App);

export default AppContainer;