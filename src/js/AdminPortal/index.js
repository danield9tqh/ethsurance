import React from "react";

import CompanyBalanceCard from "./CompanyBalanceCard";
import CompanyPoliciesCard from "./CompanyPoliciesCard";
import PaymentHistoryCard from "../PaymentHistoryCard";
import { connectContract } from "../getContract.js";

import "./style.scss";

class AdminPortal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {policies: [], payments: []};

    this.handlePayClaim = this.handlePayClaim.bind(this);
    this.setState = this.setState.bind(this);
  }

  componentWillMount() {
    this.fetchNewState(this.props).then(this.setState);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchNewState(nextProps).then(this.setState);
  }

  fetchNewState(props) {
    const contract = props.contract;
    return new Promise((resolve) => {
      contract.getPolicyHolders().then(holders => {
        contract.getPolicies(holders).then((policies) => {
          contract.getAvailiableBalance().then(balance => {
            contract.getAllPayments().then(payments => {
              resolve({availiableBalance: balance, policies: policies, payments: payments});
            });
          });
        });
      });
    });
  }

  formatPayments(payments) {
    return payments.map(payment => {
      const payer = (payment.totalAmount < 0)
        ? "Myself"
        : payment.policy;
      return {
        payer: payer,
        total: payment.totalAmount,
        effectToBalance: payment.effectToCompanyBalance
      }
    })
  }

  handlePayClaim(address, amount) {
    const contract = this.props.contract;
    contract.payClaim(address, amount).then(() => {
      this.fetchNewState(this.props).then(this.setState);
    });
  }

  render() {
    const formattedPayments = this.formatPayments(this.state.payments);
    return (
      <div className="admin-portal">
        <CompanyBalanceCard
          policies={this.state.policies}
          availiableBalance={this.state.availiableBalance}
        />
        <CompanyPoliciesCard
          policies={this.state.policies}
          payClaim={this.handlePayClaim}
        />
        <PaymentHistoryCard payments={formattedPayments} />
      </div>
    );
  }
}

const ConnectedAdminPortal = connectContract(AdminPortal);

export default ConnectedAdminPortal;
