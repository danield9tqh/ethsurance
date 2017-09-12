import React from "react";
import { Redirect } from "react-router-dom";

import Header from "./index";

class StandAloneHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {redirect: null};

    this.handleAdminClick = this.handleAdminClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ redirect: null });
  }

  handleAdminClick() {
    this.setState({redirect: "/admin"});
  }

  handleLoginClick() {
    this.setState({redirect: "/"});
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Header
        onAdminClick={this.handleAdminClick}
        onLoginClick={this.handleLoginClick}
      />
    );
  }
}

export default StandAloneHeader;
