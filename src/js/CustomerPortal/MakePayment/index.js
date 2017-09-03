import React from "react";

import Input from "../../Input";
import Button from "../../Button";

import "./style.scss";

class MakePaymentCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {amount: 0};

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleMakePayment = this.handleMakePayment.bind(this);
  }

  handleAmountChange(newAmount) {
    this.setState({amount: newAmount});
  }

  handleMakePayment() {
    this.props.makePayment(this.state.amount);
  }

  render() {
    return (
      <div className="card make-payment-card">
        <div className="label">Make Payment</div>
        <div className="card-content">
          <Input
            onChange={this.handleAmountChange}
            value={this.state.amount}
          />
          <Button
            onClick={this.handleMakePayment}
            text={"Send Payment"}
          />
        </div>
      </div>
    );
  }
}

MakePaymentCard.propTypes = {
  makePayment: React.PropTypes.func.isRequired
}

export default MakePaymentCard;
