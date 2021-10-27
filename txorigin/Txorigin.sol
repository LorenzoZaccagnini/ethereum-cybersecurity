pragma solidity ^0.8.7;

contract Wallet {
    address public owner;
    address public firstDeployer;
    constructor() payable {
        owner = msg.sender;
    }

    function changeOwner(address _to) public {
        require(tx.origin == owner, "Not owner");

        owner = _to;
    }

    function restore() external {
        owner = firstDeployer;
    }
}

