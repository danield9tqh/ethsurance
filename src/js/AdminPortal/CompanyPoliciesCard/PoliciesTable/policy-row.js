import React from "react";

import Input from "../../../Input";
import Button from "../../../Button";
import { copyTextToClipboard } from "../../../clipboard-util";

import "./style.scss";

class PolicyRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {claimAmount: ""}

    this.handlePayClaim = this.handlePayClaim.bind(this);
    this.handleCopyAddress = this.handleCopyAddress.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  handlePayClaim() {
    this.props.payClaim(this.props.policy.address, this.state.claimAmount);
    this.setState({claimAmount: ""});
  }

  handleCopyAddress() {
    copyTextToClipboard(this.props.policy.address);
  }

  handleAmountChange(newAmount) {
    this.setState({claimAmount: newAmount});
  }

  render() {
    return (
      <tr>
        <td><div className="policy-address">
          {this.props.policy.address}
          <Button
            onClick={this.handleCopyAddress}
            text={"Copy Address"}
          />
        </div></td>
        <td><div className="policy-balance">{this.props.policy.balance}</div></td>
        <td><div className="policy-percentage">{this.props.policy.guaranteedPercentage}</div></td>
        <td>
          <div className="pay-account">
            <Input
              onChange={this.handleAmountChange}
              value={this.state.claimAmount}
            />
            <Button
              onClick={this.handlePayClaim}
              text={"Pay Account"}
            />
          </div>
        </td>
      </tr>
    );
  }
}

PolicyRow.propTypes = {
  policy: React.PropTypes.object.isRequired,
  payClaim: React.PropTypes.func.isRequired
};

export default PolicyRow;
