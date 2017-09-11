import React from "react";

import AdminPortal from "../AdminPortal";
import CreatePolicy from "../CreatePolicy";
import CustomerPortal from "../CustomerPortal";
import Header from "../Header";
import Login from "../Login";

import "./style.scss";

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
      view: views.LOGIN
    };

    this.dispatchToAdminPortal = this.dispatchToAdminPortal.bind(this);
    this.dispatchToCustomerPortal = this.dispatchToCustomerPortal.bind(this);
    this.dispatchToCreatePolicy = this.dispatchToCreatePolicy.bind(this);
    this.dispatchToLoginPortal = this.dispatchToLoginPortal.bind(this);
  }

  dispatchToAdminPortal() {
    this.setState({
      view: views.ADMIN
    });
  }

  dispatchToCustomerPortal(address) {
    this.setState({
      address: address,
      view: views.VIEW_POLICY
    });
  }

  dispatchToCreatePolicy(address) {
    this.setState({
      address: address,
      view: views.CREATE_POLICY
    });
  }

  dispatchToLoginPortal() {
    this.setState({
      address: null,
      view: views.LOGIN
    });
  }

  renderLogin() {
    return (
      <Login
        handleAdminLogin={this.dispatchToAdminPortal}
        handleCustomerLogin={this.dispatchToCustomerPortal}
        handleNewCustomerLogin={this.dispatchToCreatePolicy}
      />
    )
  }

  renderCustomerPortal(address) {
    return (
      <CustomerPortal
        address={address}
      />
    )
  }

  renderAdminPortal() {
    return (
      <AdminPortal />
    );
  }

  renderCreatePolicy(address) {
    return (
      <CreatePolicy
        address={address}
        onCreate={this.dispatchToCustomerPortal}
      />
    );
  }

  renderDev() {
    return this.renderAdminPortal();
  }

  render() {
    const address = this.state.address;
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
      view = this.renderLogin();
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
