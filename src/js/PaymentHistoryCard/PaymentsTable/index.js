import React from "react";

import PaymentRow from "./payment-row";

import "./style.scss";

class PaymentsTable extends React.Component {
  render() {
    const paymentRows = this.props.payments.map(({ payer, total, affectToBalance }, index) => {
      return (
        <PaymentRow
          key={`${index}`}
          payer={payer}
          total={total}
          affectToBalance={affectToBalance}
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
    payer: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
    affectToBalance: React.PropTypes.number.isRequired
  })).isRequired
};

export default PaymentsTable;
