// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract WalletLib {

  address public owner;
  event Log(address indexed newOwner, uint timestamp, string log);
  
  constructor() public {
    owner = msg.sender;
  }

  function initWallet() public {
    owner = msg.sender;
    emit Log(owner, block.timestamp, "new owner now");
  }
}

contract Disparity {

  address public owner;
  WalletLib walletlib;
  
  

  constructor(address _target) public {
    walletlib = WalletLib(_target);
    owner = msg.sender;
  }

  fallback() external {
    (bool result,) = address(walletlib).delegatecall(msg.data);
    if (result) {
    
      this;
    }
  }
}