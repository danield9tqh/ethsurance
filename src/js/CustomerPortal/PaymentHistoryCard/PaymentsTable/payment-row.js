import React from "react";

import "./style.scss";

class PaymentRow extends React.Component {
  render() {
    const payer = (this.props.total >= 0)
      ? "Myself"
      : "Insurance Co"
    const colorClass = (this.props.total >= 0)
      ? "positive"
      : "negative"
    return (
      <tr className={colorClass} >
        <td><div className="payer">{ payer }</div></td>
        <td><div className="total">{ this.props.total }</div></td>
        <td><div className="affect-to-balance">{ this.props.affectToBalance }</div></td>
      </tr>
    );
  }
}

PaymentRow.propTypes = {
  total: React.PropTypes.number.isRequired,
  affectToBalance: React.PropTypes.number.isRequired
};

export default PaymentRow;
