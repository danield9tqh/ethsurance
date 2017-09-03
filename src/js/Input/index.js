import React from "react";

import "./style.scss";

class Input extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newValue = event.target.value;
    this.props.onChange(newValue);
  }

  render() {
    return (
      <input
        className="react-input"
        onChange={this.handleChange}
        value={this.props.value}
      />
    );
  }
}

Input.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired
};

export default Input;
