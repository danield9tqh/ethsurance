import React from "react";

import PaymentRow from "./payment-row";

import "./style.scss";

class PaymentsTable extends React.Component {
  render() {
    const paymentRows = this.props.payments.map(({ payment, balancePayment }, index) => {
      return (
        <PaymentRow
          key={`${index}`}
          total={payment}
          affectToBalance={balancePayment}
        />);
    });
    const labels = (
      <thead>
        <tr>
          <th><div className="payer">{"Payer"}</div></th>
          <th><div className="total">{"Total"}</div></th>
          <th><div className="affect-to-balance">{"Affect To Balance"}</div></th>
        </tr>
      </thead>
    );
    return (
      <table className="payments-table">
        {labels}
        <tbody>
          {paymentRows}
        </tbody>
      </table>
    );
  }
}

PaymentsTable.propTypes = {
  payments:  React.PropTypes.arrayOf(React.PropTypes.shape({
     payment: React.PropTypes.number.isRequired,
     balancePayment: React.PropTypes.number.isRequired
   })).isRequired
};

export default PaymentsTable;
