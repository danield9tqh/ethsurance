import React from "react";

import Header from "../Header/stand-alone";

import "./style.scss";

class MainPage extends React.Component {
  render() {
    return (
      <div className="main">
        <Header />
        <div className="view">
          { this.props.children || null }
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  children: React.PropTypes.node
};

export default MainPage;
