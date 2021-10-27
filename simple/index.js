let defaultAccount = null;
let accounts = null;
let contract = null;
let stored = null;
//0x4975eF8554fd9288CCCd009480072954A38E7081

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
  contract = await fetch("Storage.json")
    .then((response) => response.json())
    .then((json) => json);

  contract = new web3.eth.Contract(
    contract.abi,
    "0x4975eF8554fd9288CCCd009480072954A38E7081"
  );

  //POPULATE UI
  stored = await contract.methods
    .retrieve()
    .call()
    .then((result) => result);
  document.getElementById("stored").innerText = stored;
  document.getElementById("changeNumberInput").value = stored;
  document.getElementById("address").innerText = defaultAccount;
  document.getElementById("balance").innerText = await web3.eth.getBalance(
    defaultAccount
  );
});

document
  .getElementById("changeNumberInputBtn")
  .addEventListener("click", () => {
    contract.methods
      .store(document.getElementById("changeNumberInput").value)
      .send({ from: defaultAccount })
      .then(async() => {
        let newValue = await contract.methods
          .retrieve()
          .call()
          .then((result) => result);
        document.getElementById("stored").innerText = newValue;
      });
  });
