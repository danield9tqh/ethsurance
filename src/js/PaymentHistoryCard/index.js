import React from "react";

import PaymentsTable from "./PaymentsTable";

import "./style.scss";

class PaymentHistoryCard extends React.Component {

  render() {
    return (
      <div className="card payment-history-card">
        <div className="label">Payment History</div>
        <div className="card-content">
          <PaymentsTable payments={this.props.payments} />
        </div>
      </div>
    );
  }
}

PaymentHistoryCard.propTypes = {
  payments:  React.PropTypes.arrayOf(React.PropTypes.shape({
    payer: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
    effectToBalance: React.PropTypes.number.isRequired
  })).isRequired
}

export default PaymentHistoryCard;
