import { connect } from 'react-redux'
import Landing from '../components/Landing'
import { logout } from '../actions'

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogout: () => dispatch(logout()),
});

const LandingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing);

export default LandingContainer;