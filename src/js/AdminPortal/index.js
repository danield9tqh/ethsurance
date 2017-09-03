import React from "react";

import CompanyBalanceCard from "./CompanyBalanceCard";
import CompanyPoliciesCard from "./CompanyPoliciesCard";

import "./style.scss";

class AdminPortal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {policies: []};

    this.handlePayClaim = this.handlePayClaim.bind(this);
  }

  componentWillMount() {
    this.fetchContractData().then(data => {
      this.setState({availiableBalance: data.availiableBalance, policies: data.policies});
    });
  }

  componentWillReceiveProps(nextProps) {
    this.fetchContractData().then(data => {
      this.setState({availiableBalance: data.availiableBalance, policies: data.policies});
    });
  }

  fetchContractData() {
    const contract = this.props.contract;
    return new Promise((resolve) => {
      contract.getPolicyHolders().then(holders => {
        contract.getPolicies(holders).then((policies) => {
          contract.getAvailiableBalance().then(balance => {
            resolve({availiableBalance: balance, policies: policies});
          });
        });
      });
    });
  }

  handlePayClaim(address, amount) {
    const contract = this.props.contract;
    contract.payClaim(address, amount).then(result => {
      this.fetchContractData().then(data => {
        this.setState({availiableBalance: data.availiableBalance, policies: data.policies});
      });
    });
  }

  render() {
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
      </div>
    );
  }
}

export default AdminPortal;
