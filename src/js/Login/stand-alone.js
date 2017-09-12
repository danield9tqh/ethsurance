import React from "react";
import { Redirect } from "react-router-dom";

import MainPage from "../MainPage";
import Login from "./index";

class StandAloneLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {redirect: null};

    this.dispatchToAdminPortal = this.dispatchToAdminPortal.bind(this);
    this.dispatchToCustomerPortal = this.dispatchToCustomerPortal.bind(this);
    this.dispatchToCreatePolicy = this.dispatchToCreatePolicy.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ redirect: null });
  }

  dispatchToAdminPortal() {
    this.setState({redirect: '/admin'});
  }

  dispatchToCustomerPortal(address) {
    this.setState({redirect: `/customer/${address}`});
  }

  dispatchToCreatePolicy(address) {
    this.setState({redirect: `/create/${address}`});
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <MainPage>
        <Login
          handleAdminLogin={this.dispatchToAdminPortal}
          handleCustomerLogin={this.dispatchToCustomerPortal}
          handleNewCustomerLogin={this.dispatchToCreatePolicy}
        />
      </MainPage>
    );
  }
}

export default StandAloneLogin;
