# Underflow
If you go below 0 you will get the full capacity of the variable, in this case 255. Imagine doing that on a balance of tokens or worse...

## How to
Simply store a number and subtract it by a greater number

## Etherscan link on rinkeby
https://rinkeby.etherscan.io/address/0xe3d3b6586edc7a68ef414a2e827b1a78e46f6401#code


## Preventative Techniques

* Use SafeMath to will prevent arithmetic overflow and underflow

* Solidity 0.8 defaults to throwing an error for overflow / underflow
