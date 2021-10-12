let defaultAccount = null;
let accounts = null;
let contract = null;
let debit = null;
let credit = null;
const contractAdr = "0xDd9Ce29164E752EE4975b6e0421D3d4797b0218A";

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
    [debit, credit] = await contract.methods
      .retrieve()
      .call({ from: defaultAccount })
      .then((result) => {
        console.log(result);
        return [result._debit, result._credit];
      });
    init = await contract.methods
      .init(defaultAccount)
      .call()
      .then((result) => {
        if (result) {
          document.getElementById("setup").style.display = "block";
          document.getElementById("smartcontract").style.display = "block";
        } else {
          document.getElementById("setup").style.display = "block";
          document.getElementById("smartcontract").style.display = "none";
        }
      });
    document.getElementById("debit").innerText = debit;
    document.getElementById("credit").innerText = credit;
  };

  await refresh();

  document.getElementById("begin").addEventListener("click", () => {
    contract.methods
      .begin()
      .send({
        from: defaultAccount,
      })
      .then(() => {
        refresh();
      });
  });
  document.getElementById("changeDebit").addEventListener("click", () => {
    const _num = parseInt(document.getElementById("changeDebitInput").value);
    contract.methods
      .increaseDebit(_num)
      .send({
        from: defaultAccount,
      })
      .then(() => {
        refresh();
      });
  });
  document.getElementById("changeCredit").addEventListener("click", () => {
    if (credit == 0) {
      alert("This function is not working! QQ");
      return;
    }
    const _num = parseInt(document.getElementById("changeCreditInput").value);
    contract.methods
      .decreaseCredit(_num)
      .send({
        from: defaultAccount,
      })
      .then(() => {
        refresh();
      });
  });
  document.getElementById("win").addEventListener("click", () => {
    contract.methods
    .win()
    .call({ from: defaultAccount })
    .then((result) => {
      console.log(result);
      alert(result)
    });
  });
});
