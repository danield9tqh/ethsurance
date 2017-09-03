import React from "react";

import AdminPortal from "../AdminPortal";
import CreatePolicy from "../CreatePolicy";
import CustomerPortal from "../CustomerPortal";
import Header from "../Header";
import Login from "../Login";
import {PolicyDoesNotExist, InvalidAddressError} from "../contract";
import getContract from "../getContract.js";
import EthsuranceContract from "../contract";

import "./style.scss";

const BLOCKCHAIN_URL = "http://localhost:8545";

const views = {
  CREATE_POLICY: 1,
  LOGIN: 2,
  VIEW_POLICY: 3,
  ADMIN: 4,
  DEV: 5
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      error: null,
      view: views.LOGIN
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handlePolicyCreated = this.handlePolicyCreated.bind(this);
    this.dispatchToAdminPortal = this.dispatchToAdminPortal.bind(this);
    this.dispatchToLoginPortal = this.dispatchToLoginPortal.bind(this);
  }

  componentDidMount() {
    getContract().then(contract => {
      const ethsuranceContract = new EthsuranceContract(contract.address, contract.abi, BLOCKCHAIN_URL);
      this.setState({contract: ethsuranceContract});
    });
  }

  handleLogin(address) {
    this.state.contract.getOwner().then(owner_address => {
      if (address === owner_address) {
        this.dispatchToAdminPortal();
      } else {
        this.state.contract.getPolicy(address).then(policy => {
          this.setState({
            address: address,
            error: null,
            view: views.VIEW_POLICY
          });
        }).catch((e) => {
          if (e instanceof PolicyDoesNotExist) {
            this.setState({
              address: address,
              error: null,
              view: views.CREATE_POLICY
            });
          } else if (e instanceof InvalidAddressError) {
            this.setState({
              address: null,
              error: "Whoops, looks like that address is not valid",
              view: views.LOGIN
            });
          }
        });
      }
    });
  }

  dispatchToAdminPortal() {
    this.setState({
      error: null,
      view: views.ADMIN
    });
  }

  dispatchToLoginPortal() {
    this.setState({
      address: null,
      error: null,
      view: views.LOGIN
    });
  }

  handleLogout() {
    this.setState({
      address: null,
      error: null,
      view: views.LOGIN
    });
  }

  handlePolicyCreated(address) {
    this.setState({
      address: address,
      error: null,
      view: views.VIEW_POLICY
    });
  }

  renderLogin(error) {
    return (
      <Login
        onLogin={this.handleLogin}
        error={error}
      />
    )
  }

  renderCustomerPortal(address) {
    return (
      <CustomerPortal
        contract={this.state.contract}
        address={address}
        onLogout={this.handleLogout}
      />
    )
  }

  renderAdminPortal() {
    return (
      <AdminPortal contract={this.state.contract} />
    );
  }

  renderCreatePolicy(address) {
    return (
      <CreatePolicy
        contract={this.state.contract}
        address={address}
        onCreate={this.handlePolicyCreated}
      />
    );
  }

  renderDev() {
    return this.renderAdminPortal();
  }

  render() {
    const address = this.state.address;
    const error = this.state.error
    let view;
    if (this.state.view === views.CREATE_POLICY) {
      view =  this.renderCreatePolicy(address);
    } else if (this.state.view === views.VIEW_POLICY) {
      view = this.renderCustomerPortal(address);
    } else if (this.state.view === views.ADMIN) {
      view = this.renderAdminPortal();
    } else if (this.state.view === views.DEV) {
      view = this.renderDev();
    } else {
      view = this.renderLogin(error);
    }

    return (
      <div className="main">
        <Header
          onAdminClick={this.dispatchToAdminPortal}
          onLoginClick={this.dispatchToLoginPortal}
        />
        <div className="view">
          {view}
        </div>
      </div>
    );
  }
}


export default Main;
