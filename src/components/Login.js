import React, { Component } from 'react'

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onLogin(this.username.value, this.password.value);
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="form-horizontal col-md-4">
          {this.props.err && <div className="alert alert-danger" role="alert">
            {this.props.err}
          </div>}
          <div className="form-group">
            <label
              className="col-md-4 control-label"
              htmlFor="username">
              Username
            </label>
            <div className="col-md-8">
              <input
                className="form-control"
                type="text"
                id="username"
                placeholder="username"
                minLength="3"
                maxLength="20"
                size="20"
                required
                ref={(input) => { this.username = input; }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              className="col-md-4 control-label"
              htmlFor="password">
              Password
            </label>
            <div className="col-md-8">
              <input
                className="form-control"
                type="password"
                id="password"
                placeholder="password"
                minLength="3"
                maxLength="20"
                size="20"
                required
                ref={(input) => { this.password = input; }}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-4 col-md-8">
              <button
                type="submit"
                className="btn btn-default"
                {...{ disabled: this.props.authentication }}
              >
                login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
