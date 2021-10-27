let defaultAccount = null;
let accounts = null;
let contract = null;
let stored = null;
const contractAdr = "0xF6ef841Ed4312D17AAc5e9e6039Ee008e893fE51";
//0xF6ef841Ed4312D17AAc5e9e6039Ee008e893fE51

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

  //POPULATE UI
  let refresh = async () => {
    stored = await contract.methods
      .prize()
      .call()
      .then((result) => result);
    let best_address = await contract.methods
      ._bestBid()
      .call()
      .then((result) => result);
    document.getElementById("best_address").innerText = best_address;
    document.getElementById("stored").innerText = stored;
    document.getElementById("changeNumberInput").value = stored;
    document.getElementById("address").innerText = defaultAccount;
  };

  await refresh();

  document
    .getElementById("changeNumberInputBtn")
    .addEventListener("click", () => {
      web3.eth.sendTransaction(
        {
          from: defaultAccount,
          to: contractAdr,
          value: parseInt(document.getElementById("changeNumberInput").value),
        },
        () => {
          refresh();
        }
      );
    });
  document.getElementById("restore").addEventListener("click", () => {
    contract.methods
      .restore()
      .send({
        from: defaultAccount,
        value: 1000
      })
      .then(() => {
        refresh();
      });
  });
});
