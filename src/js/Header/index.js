import React from "react";

import "./style.scss";

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleAdminClick = this.handleAdminClick.bind(this);
  }

  handleLoginClick() {
    this.props.onLoginClick();
  }

  handleAdminClick() {
    this.props.onAdminClick();
  }

  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <div className="logo-name">Ethsurance</div>
        </div>
        <div className="header-navigation">
          <div className="header-button" onClick={this.handleLoginClick}>
            {"Switch Accounts"}
          </div>
          <div className="header-button" onClick={this.handleAdminClick}>
            {"Admin"}
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onAdminClick: React.PropTypes.func,
  onLoginClick: React.PropTypes.func
};

export default Header;
