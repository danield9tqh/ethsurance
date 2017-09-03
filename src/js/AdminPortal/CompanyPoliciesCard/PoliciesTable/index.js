import React from "react";

import PolicyRow from "./policy-row";

import "./style.scss";

class PoliciesTable extends React.Component {

  constructor(props) {
    super(props);

    this.handlePayClaim = this.handlePayClaim.bind(this);
  }

  handlePayClaim(policyHolder, amount) {
    this.props.payClaim(policyHolder, amount);
  }

  render() {
    const policyRows = this.props.policies.map((policy) => {
      return (
        <PolicyRow
          key={policy.address}
          policy={policy}
          payClaim={this.handlePayClaim}
        />
      );
    });
    const labels = (
      <thead>
        <tr>
          <th><div className="policy-address">{"Address"}</div></th>
          <th><div className="policy-balance">{"Balance"}</div></th>
          <th><div className="policy-percentage">{"Percentage"}</div></th>
        </tr>
      </thead>
    );
    return (
      <table>
        {labels}
        <tbody>
          {policyRows}
        </tbody>
      </table>
    );
  }
}

PoliciesTable.propTypes = {
  policies: React.PropTypes.array.isRequired,
  payClaim: React.PropTypes.func.isRequired
};

export default PoliciesTable;
