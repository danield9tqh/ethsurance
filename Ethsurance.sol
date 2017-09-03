pragma solidity ^0.4.11;

/*
 * Ethsurance allows users to have an assurance that a specific
 */
contract Ethsurance {

  /*
   * A policy is the basis of the customer's interaction
   * with the insurance company. The _guaranteedPercentage
   * field specifies that that percentage of funds can only be
   * spent on the policy holder.
   */
  struct Policy {
    uint _guaranteedPercentage;
    uint _balance;
    bool _exists;
    int[] _payments;
  }

  mapping (address => Policy) public policies;

  address[] public policyHolders;

  address public owner;

  uint public availiableBalance;

  function Ethsurance() {
    owner = msg.sender;
    policyHolders.length = 0;
  }

  function getNumberOfHolders() constant returns (uint){
    return policyHolders.length;
  }

  function getNumberOfPayments(address policyHolder) constant returns (uint){
    return policies[policyHolder]._payments.length;
  }

  function getPayment(address policyHolder, uint index) constant returns (int){
    return policies[policyHolder]._payments[index];
  }

  function createPolicy(uint guaranteedPercentage) payable returns (bool) {
    uint reservedAmount = (guaranteedPercentage * msg.value) / 100;
    uint availiableAmount = (msg.value - reservedAmount);

    if (!policies[msg.sender]._exists) {
      policies[msg.sender] = Policy({
        _guaranteedPercentage: guaranteedPercentage,
        _balance: reservedAmount,
        _exists: true,
        _payments: new int[](0)
      });
      policies[msg.sender]._payments.push(int(msg.value));
      policyHolders.push(msg.sender);
      availiableBalance += availiableAmount;
      return true;
    }
    return false;
  }

  /*
   * Usually excecuted by the sender, but can be excecuted by anyone.
   * Makes a payment 'into' or 'towards' a policy. A percentage of
   * the payment is delegated to that policy's balance and the rest
   * goes to the balance of the contract which is controlled by the owner.
   *
   */
  function makePayment() payable returns(bool) {
    if (policies[msg.sender]._exists) {
      uint reservedAmount = (policies[msg.sender]._guaranteedPercentage * msg.value) / 100;
      uint availiableAmount = (msg.value - reservedAmount);

      policies[msg.sender]._balance += reservedAmount;
      availiableBalance += availiableAmount;
      policies[msg.sender]._payments.push(int(msg.value));
      return true;
    }
    return false;
  }

  /*
   * Excecuted by the owner of the contract. Withdraw funds
   * from the contract if they are availiable in the availiableBalance
   */
  function withdrawal(uint amount) payable returns(bool) {
    if (msg.sender == owner && availiableBalance <= amount) {
      availiableBalance -= amount;
      msg.sender.transfer(amount);
      return true;
    }
    return false;
  }

  /*
   * Excecuted by the owner of the contract. Pay funds
   * from the contract to the policy holder. Any funds paid to
   * the policy owner deducts from their policy balance.
   */
  function payClaim(address policyHolder, uint amount) payable returns(bool) {
    if (policies[policyHolder]._exists && msg.sender == owner) {
      uint policyBalance = policies[policyHolder]._balance;
      if (amount <= policyBalance) {
        policies[policyHolder]._balance -= amount;
        policyHolder.transfer(amount);
        policies[policyHolder]._payments.push(int(amount) * int(-1));
      } else if (amount <= (policyBalance + availiableBalance)) {
        uint remainingAmount = amount - policyBalance;
        policies[policyHolder]._balance = 0;
        availiableBalance -= remainingAmount;
        policyHolder.transfer(amount);
        policies[policyHolder]._payments.push(int(amount) * int(-1));
      } else {
        return false;
      }
    }
    return false;
  }

}
