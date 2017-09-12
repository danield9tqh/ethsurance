import React from "react";
import { Redirect } from "react-router-dom";

import MainPage from "../MainPage";
import CreatePolicy from "./index";

class StandAloneCreatePolicy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {redirect: null};

    this.dispatchToCustomerPortal = this.dispatchToCustomerPortal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ redirect: null });
  }

  dispatchToCustomerPortal(address) {
    this.setState({redirect: `/customer/${address}`});
  }

  render() {
    const address = this.props.match.params.address;
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <MainPage>
        <CreatePolicy
          onCreate={this.dispatchToCustomerPortal}
          address={address}
        />
      </MainPage>
    );
  }
}

export default StandAloneCreatePolicy;
