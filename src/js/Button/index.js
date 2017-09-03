import React from "react";

import "./style.scss";

class Button extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick(event);
  }

  render() {
    return (
      <div
        className="react-button"
        onClick={this.handleClick}
      >
        {this.props.text}
      </div>
    );
  }
}

Button.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired
};

export default Button;
