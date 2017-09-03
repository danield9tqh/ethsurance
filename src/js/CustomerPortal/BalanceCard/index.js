import React from "react";

import "./style.scss";

class BalanceCard extends React.Component {
  render() {
    return (
      <div className="card balance-card">
        <div className="label">Amount Withheld</div>
        <div className="balance">{this.props.balance} Wei</div>
      </div>
    );
  }
}

BalanceCard.propTypes = {
  balance: React.PropTypes.number
}

BalanceCard.defaultProps = {
  balance: 0
};

export default BalanceCard;
