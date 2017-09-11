import React from "react";

import BalanceCard from "./BalanceCard";
import MakePayment from "./MakePayment";
import PaymentHistoryCard from "../PaymentHistoryCard";
import { connectContract } from "../getContract.js";

import "./style.scss";

class CustomerPortal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {policy: null, payments: []};

    this.handleMakePayment = this.handleMakePayment.bind(this);
  }

  componentWillMount() {
    const contract = this.props.contract;
    contract.getPolicy(this.props.address).then(policy => {
      contract.getPayments(this.props.address).then(payments => {
        this.setState({
          policy: policy,
          payments: this.formatPayments(payments)
        });
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const contract = nextProps.contract;
    contract.getPolicy(nextProps.address).then(policy => {
      contract.getPayments(nextProps.address).then(payments => {
        this.setState({
          policy: policy,
          payments: this.formatPayments(payments)
        });
      });
    });
  }

  handleMakePayment(amount) {
    const contract = this.props.contract;
    contract.makePayment(amount, this.props.address).then(() => {
      contract.getPolicy(this.props.address).then(policy => {
        contract.getPayments(this.props.address).then(payments => {
          this.setState({
            policy: policy,
            payments: this.formatPayments(payments)
          });
        });
      });
    })
  }

  formatPayments(payments) {
    return payments.map(({payment, balancePayment}) => {
      const payer = (payment >= 0)
        ? "Myself"
        : "Insurance Co";
      return {
        payer: payer,
        total: payment,
        effectToBalance: balancePayment
      };
    })
  }

  render() {
    const defaultPercentage = this.state.policy ? this.state.policy.guaranteedPercentage : null;
    const balance = this.state.policy ? this.state.policy.balance : null;
    return (
      <div className="customer-portal">
        <BalanceCard balance={balance} />
        <MakePayment makePayment={this.handleMakePayment} />
        <PaymentHistoryCard payments={this.state.payments} />
      </div>

    );
  }
}

CustomerPortal.propTypes = {
  address: React.PropTypes.string.isRequired,
  contract: React.PropTypes.object.isRequired,
};

const ConnectedCustomerPortal = connectContract(CustomerPortal);

export default ConnectedCustomerPortal;
