import Web3 from "web3";

const transactionGasLimit = 4700000;

class EthsuranceContract {
  constructor(address, abi, blockchain_url) {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchain_url));

    this.contract = new web3.eth.Contract(abi, address);
  }

  getOwner() {
    return this.contract.methods.owner().call();
  }

  getAvailiableBalance() {
    return this.contract.methods.availiableBalance()
      .call().then(value => parseInt(value));
  }

  getPolicyHolders() {
    return new Promise((resolve, reject) => {
      this.contract.methods.getNumberOfHolders().call().then((number) => {
        const numberInt = parseInt(number);
        let promises = new Array();
        for (var i = 0; i< numberInt; i++) {
          promises[i] = this.contract.methods.policyHolders(i).call();
        }
        Promise.all(promises).then((results) => {
          resolve(results);
        });
      });
    });
  }

  getPayments(policyHolder) {
    return new Promise((resolve, reject) => {
      this.contract.methods.getNumberOfPayments(policyHolder).call().then((number) => {
        const numberInt = parseInt(number);
        let promises = new Array();
        for (var i = 0; i< numberInt; i++) {
          promises[i] = this.contract.methods.getPayment(policyHolder, i).call();
        }
        Promise.all(promises).then((payments) => {
          const numericPayments = payments.map(payment => {
            return parseInt(payment);
          });
          resolve(numericPayments);
        });
      });
    });
  }

  getBalancePayments(policyHolder) {
    return new Promise((resolve, reject) => {
      this.contract.methods.getNumberOfBalancePayments(policyHolder).call().then((number) => {
        const numberInt = parseInt(number);
        let promises = new Array();
        for (var i = 0; i< numberInt; i++) {
          promises[i] = this.contract.methods.getBalancePayment(policyHolder, i).call();
        }
        Promise.all(promises).then((payments) => {
          const numericPayments = payments.map(payment => {
            return parseInt(payment);
          });
          resolve(numericPayments);
        });
      });
    });
  }

  getAllPayments(policyHolder) {
    return new Promise(resolve => {
      this.getPayments(policyHolder).then(payments => {
        this.getBalancePayments(policyHolder).then(balancePayments => {
          const zippedPayments = payments.map((payment, i) => {
              return {
                payment: payment,
                balancePayment: balancePayments[i]
              };
          });
          resolve(zippedPayments);
        });
      });
    });
  }

  payClaim(holder, weiAmount) {
    return new Promise((resolve, reject) => {
      if (weiAmount > 0) {
        this.getOwner().then((ownerAddress) => {
          this.contract.methods.payClaim(holder, weiAmount).send({
            from: ownerAddress,
            gas: transactionGasLimit
          }).then(result => resolve(result));
        });
      } else {
        reject()
      }
    });
  }

  makePayment(weiAmount, holder) {
    if (weiAmount > 0) {
      return this.contract.methods.makePayment().send({
        from: holder,
        gas: transactionGasLimit,
        value: weiAmount
      });
    } else {
      return new Promise(resolve => resolve(false));
    }
  }

  getPolicy(address) {
    return new Promise((resolve, reject) => {
      try {
        const policyRequest = this.contract.methods.policies(address).call().then(policy => {
          if(!policy._exists) return reject(new PolicyDoesNotExist());
          resolve({
            address: address,
            balance: parseInt(policy._balance),
            guaranteedPercentage: parseInt(policy._guaranteedPercentage)
          });
        });
      } catch (e) {
        reject(new InvalidAddressError(e.message));
      }
    })
  }

  getPolicies(addresses) {
    const promises = addresses.map(address => {
      return this.getPolicy(address);
    });
    return Promise.all(promises);
  }

  createPolicy(holder, guaranteedPercentage) {
    return this.contract.methods.createPolicy(guaranteedPercentage).send({
      from: holder,
      gas: transactionGasLimit
    });
  }
}

export class InvalidAddressError extends Error {
  constructor(args) {
    super(args);
    Error.captureStackTrace(this, InvalidAddressError);
  }
}

export class PolicyDoesNotExist extends Error {
  constructor(args) {
    super(args);
    Error.captureStackTrace(this, InvalidAddressError);
  }
}

export default EthsuranceContract;
