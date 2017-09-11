import React from "react";

import Input from "../Input";
import Button from "../Button";
import {PolicyDoesNotExist, InvalidAddressError} from "../contract";
import { connectContract } from "../getContract.js";

import "./style.scss";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {address: "", error: null};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ error: null });
  }

  handleInputChange(newValue) {
    this.setState({address: newValue});
  }

  handleLogin() {
    const address = this.state.address;
    this.props.contract.getOwner().then(owner_address => {
      if (address === owner_address) {
        this.props.handleAdminLogin();
      } else {
        this.props.contract.getPolicy(address).then(policy => {
          this.props.handleCustomerLogin(address);
        }).catch((e) => {
          if (e instanceof PolicyDoesNotExist) {
            this.props.handleNewCustomerLogin(address);
          } else if (e instanceof InvalidAddressError) {
            this.setState({
              error: "Whoops, looks like that address is not valid"
            });
          }
        });
      }
    });
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
          <div className="error">{this.state.error}</div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  contract: React.PropTypes.object.isRequired,
  handleAdminLogin: React.PropTypes.func.isRequired,
  handleCustomerLogin: React.PropTypes.func.isRequired,
  handleNewCustomerLogin: React.PropTypes.func.isRequired
};

const ConnectedLogin = connectContract(Login);

export default ConnectedLogin;
