import React from "react";

import PoliciesTable from "./PoliciesTable";

import "./style.scss";

class CompanyPoliciesCard extends React.Component {

  constructor(props) {
    super(props);

    this.handlePayClaim = this.handlePayClaim.bind(this);
  }

  handlePayClaim(policyHolder, amount) {
    this.props.payClaim(policyHolder, amount);
  }

  render() {
    return (
      <div className="card policy-list">
        <div className="label">Policies</div>
        <div className="policies">
          <PoliciesTable
            policies={this.props.policies}
            payClaim={this.handlePayClaim}
          />
        </div>
      </div>
    );
  }
}

CompanyPoliciesCard.propTypes = {
  policies: React.PropTypes.array.isRequired,
  payClaim: React.PropTypes.func.isRequired
};

export default CompanyPoliciesCard;
