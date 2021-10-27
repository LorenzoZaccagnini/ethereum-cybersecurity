pragma solidity ^0.6.0;

contract Visibility {
  bytes32 private password;
  bytes16 public trash = "my space";
  bytes16 public trash_second = "more space";
  bytes32 private password_second;
  
  constructor(bytes32 _password, bytes32 _password_second) public {
    password = _password;
    password_second =_password_second;
  }


  function win(bytes32 _password, bytes32 _password_second) public view returns(bool _win){
    if (password == _password && password_second == _password_second) {
        return true;
    }
    return false;
  }
}