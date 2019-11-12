let setUpBankroll = () => {

  let bankroll = localStorage.getItem('bankroll');
  if(!bankroll) {
    bankroll = "100.00";
    localStorage.setItem('bankroll', bankroll);
  }
  document.getElementById("bankroll").innerHTML = `$${bankroll}`;
};

//Test

export default setUpBankroll;