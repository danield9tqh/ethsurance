import React from "react";

import BalanceCard from "./BalanceCard";
import MakePayment from "./MakePayment";
import PaymentHistoryCard from "../PaymentHistoryCard";
import { connectContract } from "../getContract.js";

import "./style.scss";

const REFRESH_RATE = 5000 // (in milliseconds) Refresh every 5 seconds

class CustomerPortal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {policy: null, payments: []};

    this.handleMakePayment = this.handleMakePayment.bind(this);
    this.setState = this.setState.bind(this);
  }

  componentWillMount() {
    this.fetchNewState(this.props).then(this.setState);
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchNewState(this.props).then(this.setState);
    }, REFRESH_RATE);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchNewState(nextProps).then(this.setState);
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.fetchNewState(this.props).then(this.setState);
    }, REFRESH_RATE);
  }

  fetchNewState(props) {
    const contract = props.contract;
    return new Promise((resolve) => {
      contract.getPolicy(props.address).then(policy => {
        contract.getPayments(props.address).then(payments => {
          resolve({
            policy: policy,
            payments: this.formatPayments(payments)
          });
        });
      });
    });
  }

  handleMakePayment(amount) {
    this.props.contract.makePayment(amount, this.props.address).then(() => {
      this.fetchNewState(this.props).then(this.setState);
    });
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
