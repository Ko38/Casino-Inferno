import setUpBankroll from "../setUpBankroll.js";

window.onload = () => {
  setUpBankroll();
  let oneDollarChip = document.getElementById("oneDollarChip");
  oneDollarChip.onclick = () => {
    console.log("Clicked")
  };
};