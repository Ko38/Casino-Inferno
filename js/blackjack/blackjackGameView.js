import BlackjackGame from "./blackjackGame.js";

class BlackjackGameView {
  constructor() {
    this.game = new BlackjackGame();
    let seat0 = document.getElementById("seat0");
    let seat1 = document.getElementById("seat1");
    let seat2 = document.getElementById("seat2");
    this.seats = [seat0, seat1, seat2];
    this.selectedChipAmount = 1;
    this.setUpSelectChipEvents();    
  }

  startGame() {
    this.setUpPlaceBetEvents();
    this.setUpClearEvents();
    document.getElementById("deal-button").onclick = () => {
      this.game.deal();
    };
  }

  setUpSelectChipEvents() {
    let oneDollarChip = document.getElementById("oneDollarChip");
    let fiveDollarChip = document.getElementById("fiveDollarChip");
    let tenDollarChip = document.getElementById("tenDollarChip");
    let twentyFiveDollarChip = document.getElementById("twentyFiveDollarChip");
    let chipElements = [oneDollarChip, fiveDollarChip, tenDollarChip, twentyFiveDollarChip];
    for (let chipSelected of chipElements) {
      chipSelected.onclick = () => {
        for (let chip of chipElements) {
          if (chip === chipSelected) {
            chip.classList.add("selected");
            this.selectedChipAmount = parseInt(chip.getAttribute("value")) || 1;
          } else {
            chip.classList.remove("selected");
          }
        }
      };
    }
  }

  setUpPlaceBetEvents() {
    for (let i = 0; i < this.seats.length; i++) {
      this.seats[i].onclick = () => {
        this.game.placeBet(i, this.selectedChipAmount);
        this.seats[i].innerHTML = "<img src='./assets/empty_chip_25.png'></img>";
        this.seats[i].innerHTML += "<div class='centered-betAmount'>" + this.game.getCurrentBetAmount(i) + "</div>";
      };
    }
  }

  setUpClearEvents() {
    document.getElementById("clear-button").onclick = () => {
      this.game.clearBets();
      for(let i = 0; i < this.seats.length; i++) {
        this.seats[i].innerHTML = "";
      }
    };
  }
}

export default BlackjackGameView;