import React from "react";

import Input from "../Input";
import Button from "../Button";

import "./style.scss";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {address: ""};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputChange(newValue) {
    this.setState({address: newValue});
  }

  handleLogin() {
    this.props.onLogin(this.state.address);
  }

  render() {
    return (
      <div className="login-page">
        <div className="card no-hover-animation login-card">
          <div className="label">Ethereum Address</div>
          <div className="login">
            <div className="address-input">
              <Input
                onChange={this.handleInputChange}
                value={this.state.address}
              />
            </div>
            <div className="login-button">
              <Button onClick={this.handleLogin} text={"View Policy"} />
            </div>
          </div>
          <div className="error">{this.props.error}</div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: React.PropTypes.func.isRequired,
  error: React.PropTypes.string
};

export default Login;
