import React, { Component } from 'react'
import LoginContainer from '../containers/LoginContainer'
import LandingContainer from '../containers/LandingContainer'

class App extends Component {
  render() {
    return (
      <div>
        {!this.props.authenticated ? <LoginContainer /> : <LandingContainer />}
      </div>
    );
  }
}

export default App;
