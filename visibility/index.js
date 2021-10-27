let defaultAccount = null;
let accounts = null;
let contract = null;
let debit = null;
let credit = null;
const contractAdr = "0x085d4eE80d5850aD21dfd488bf219aDc71469D34";

window.addEventListener("load", async () => {
  // New web3 provider
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // ask user for permission
      await ethereum.enable();
      // user approved permission
    } catch (error) {
      // user rejected permission
      console.log("user rejected permission");
    }
  }
  // Old web3 provider
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // no need to ask for permission
  }
  // No web3 provider
  else {
    console.log("No web3 provider detected");
  }

  //get accounts
  accounts = await web3.eth.getAccounts();
  console.log(accounts, "accs");
  defaultAccount = accounts[0];
  console.log(defaultAccount);

  //CONTRACT STUFF
  contract = await fetch("abi.json")
    .then((response) => response.json())
    .then((json) => json);

  contract = new web3.eth.Contract(contract.abi, contractAdr);

  
  document.getElementById("win").addEventListener("click", () => {
    const pw1 = document.getElementById("changeFirstInput").value;
    const pw2 = document.getElementById("changeSecondInput").value;
    contract.methods
    .win(pw1, pw2)
    .call({ from: defaultAccount })
    .then((result) => {
      console.log(result);
      alert("your win is: " + result)
      if (result) {
        document.getElementById("windiv").style.display = "block";
      }
    });
  });
});
