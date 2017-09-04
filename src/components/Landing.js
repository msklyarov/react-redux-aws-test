import React, { Component } from 'react'

class Landing extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onLogout();
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="form-horizontal col-md-6">
          <div>{this.props.data}</div>
          <hr />
          <div className="form-group">
            <div className="col-sm-offset-0 col-md-6">
              <button type="submit" className="btn btn-default">signout</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Landing;
