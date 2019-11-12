let setUpBankroll = () => {

  let bankroll = localStorage.getItem('bankroll');
  
  if (parseInt(bankroll) <= 0){
    document.getElementById("bj-content").innerHTML += 
    `<div class="alert">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
    <strong>You went bankrupt!</strong> <br/>Your balance is reset to $100.00.
  </div>`;
    bankroll = "100.00";
    localStorage.setItem('bankroll', bankroll);
  } else if(!parseInt(bankroll)) {
    bankroll = "100.00";
    localStorage.setItem('bankroll', bankroll);
  } 
  document.getElementById("bankroll").innerHTML = `$${bankroll}`;
};

//Test

export default setUpBankroll;