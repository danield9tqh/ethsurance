import React from "react";

import EthsuranceContract from "./contract";

const contractPath = 'http://localhost:8080/contract.json';
const BLOCKCHAIN_URL = "http://localhost:8545";

const getContract = () => {
  return new Promise((resolve, reject) => {
    function requestListener () {
      const contract = JSON.parse(this.responseText);
      resolve(contract);
    }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", requestListener);
    oReq.open("GET", contractPath);
    oReq.send();
  });
};

const connectContract = (Component) => {
  return class ConnectedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {contract: null}
    }

    componentDidMount() {
      getContract().then(contract => {
        const ethsuranceContract = new EthsuranceContract(contract.address, contract.abi, BLOCKCHAIN_URL);
        this.setState({contract: ethsuranceContract});
      });
    }

    render() {
      if(!this.state.contract) {
        return null;
      } else {
        return (
          <Component
            contract={this.state.contract}
            {...this.props}
          />
        )
      }
    }
  }
}

export { getContract, connectContract };
