import React from "react";

import Input from "../Input";
import Button from "../Button";

import "./style.scss";

class CreatePolicy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      percentage: ""
    }

    this.handleCreate = this.handleCreate.bind(this);
    this.handlePercentageChange = this.handlePercentageChange.bind(this);
  }

  handleCreate() {
    const contract = this.props.contract;
    const holder = this.props.address;
    const guaranteedPercentage = this.state.percentage;
    contract.createPolicy(holder, guaranteedPercentage).then(() => {
      this.props.onCreate(this.props.address);
    });
  }

  handlePercentageChange(newValue) {
    this.setState({percentage: newValue});
  }

  render() {
    return (
      <div className="create-policy-page">
        <div className="message">
          {"This address does not have a policy yet. If you would like to create one please enter a withholding percentage below for a new policy."}
        </div>
        <div className="withholding-percentage">
          {"Withholding Percentage: "}
          <Input
            onChange={this.handlePercentageChange}
            value={this.state.percentage}
          />
        </div>
        <Button
          onClick={this.handleCreate}
          text={"Create Policy"}
        />
      </div>
    );
  }
}

CreatePolicy.propTypes = {
  address: React.PropTypes.string.isRequired,
  onCreate: React.PropTypes.func.isRequired
};


export default CreatePolicy;
