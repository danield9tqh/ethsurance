import React from "react";
import "./style.scss";

class CompanyBalanceCard extends React.Component {

  getTotalBalance(policies) {
    const balances = policies.map(policy => policy.balance);
    return balances.reduce((b1, b2) => {return b1 + b2;}, 0);
  }

  render() {
    const lockedBalance = this.getTotalBalance(this.props.policies);
    const totalBalance = this.props.availiableBalance + lockedBalance;
    return (
      <div className="card company-balance-card">
        <div className="label">Company Balance</div>
        <div className="card-content">
          <div className="availiable-balance">
            <div>Availiable: </div>
            <div>{this.props.availiableBalance} Wei</div>
          </div>
          <div className="locked-balance">
            <div>Locked: </div>
            <div>{lockedBalance} Wei</div>
          </div>
          <div className="separator"></div>
          <div className="total-balance">
            <div>Total: </div>
            <div>{totalBalance} Wei</div>
          </div>
        </div>
      </div>
    );
  }
}

CompanyBalanceCard.propTypes = {
  availiableBalance: React.PropTypes.number.isRequired,
  policies: React.PropTypes.array.isRequired
}

export default CompanyBalanceCard;
