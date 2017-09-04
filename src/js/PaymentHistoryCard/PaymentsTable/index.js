import React from "react";

import PaymentRow from "./payment-row";

import "./style.scss";

class PaymentsTable extends React.Component {
  render() {
    const paymentRows = this.props.payments.map(({ payer, total, effectToBalance }, index) => {
      return (
        <PaymentRow
          key={`${index}`}
          payer={payer}
          total={total}
          effectToBalance={effectToBalance}
        />);
    });
    const labels = (
      <thead>
        <tr>
          <th><div className="payer">{"Payer"}</div></th>
          <th><div className="total">{"Total"}</div></th>
          <th><div className="effect-to-balance">{"Effect To Balance"}</div></th>
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
    effectToBalance: React.PropTypes.number.isRequired
  })).isRequired
};

export default PaymentsTable;
