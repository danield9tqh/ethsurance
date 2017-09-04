import React from "react";

import "./style.scss";

class PaymentRow extends React.Component {
  render() {
    const colorClass = (this.props.total >= 0)
      ? "positive"
      : "negative"
    return (
      <tr className={colorClass} >
        <td><div className="payer">{ this.props.payer }</div></td>
        <td><div className="total">{ this.props.total }</div></td>
        <td><div className="effect-to-balance">{ this.props.effectToBalance }</div></td>
      </tr>
    );
  }
}

PaymentRow.propTypes = {
  payer: React.PropTypes.string.isRequired,
  total: React.PropTypes.number.isRequired,
  effectToBalance: React.PropTypes.number.isRequired
};

export default PaymentRow;
