import React from "react";

import CompanyBalanceCard from "./CompanyBalanceCard";
import CompanyPoliciesCard from "./CompanyPoliciesCard";
import PaymentHistoryCard from "../PaymentHistoryCard";

import "./style.scss";

class AdminPortal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {policies: [], payments: []};

    this.handlePayClaim = this.handlePayClaim.bind(this);
  }

  componentWillMount() {
    this.fetchContractData().then(data => {
      this.setState({availiableBalance: data.availiableBalance, policies: data.policies, payments: data.payments});
    });
  }

  componentWillReceiveProps(nextProps) {
    this.fetchContractData().then(data => {
      this.setState({availiableBalance: data.availiableBalance, policies: data.policies, payments: data.payments});
    });
  }

  fetchContractData() {
    const contract = this.props.contract;
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
    contract.payClaim(address, amount).then(result => {
      this.fetchContractData().then(data => {
        this.setState({availiableBalance: data.availiableBalance, policies: data.policies, payments: data.payments});
      });
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

export default AdminPortal;
