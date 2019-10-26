import BlackjackGame from "./blackjackGame.js";

class BlackjackGameView {
  constructor() {
    this.game = new BlackjackGame(this.render.bind(this));
    this.seats = [
      document.getElementById("seat0"), document.getElementById("seat1"), 
      document.getElementById("seat2")
    ];
    this.selectedChipAmount = 1;
    this.setUpSelectChipEvents();    
    this.hideAllCards();
  }

  hideAllCards() {
    for(let seatNo = 0; seatNo < 3; seatNo++) {
      for (let i = 0; i < 8; i++) {
        document.getElementById(`card${seatNo}${i}`).style.visibility = "hidden";
      } 
    }
  }

  setUpPlayerDecisionButtons() {
    document.getElementById("left-buttons").innerHTML = 
      `<button class="nav-bar-button" id="hit-button">HIT</button>
        <button class="nav-bar-button" id="double-button">DOUBLE</button>`;
    document.getElementById("right-buttons").innerHTML =
      `<button class="nav-bar-button" id="stand-button">STAND</button>
        <button class="nav-bar-button" id="split-button">SPLIT</button>`;
    document.getElementById("hit-button").onclick = () => {
      this.game.hit();
    };
    document.getElementById("stand-button").onclick = () => {
      this.game.stand();
    };
    document.getElementById("double-button").onclick = () => {
      this.game.double();
    };
    document.getElementById("split-button").onclick = () => {
      this.game.split();
    };
  }

  startGame() {
    this.setUpPlaceBetEvents();
    this.setUpClearEvents();
    document.getElementById("deal-button").onclick = () => {
      if(this.game.deal()) {
        this.setUpPlayerDecisionButtons();
      }

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

  updateBankroll() {
    let bankroll = localStorage.getItem('bankroll');
    document.getElementById("bankroll").innerHTML = `BANKROLL: $${bankroll}`;
  }

  render() {
    this.updateBankroll();
    for(let seatNo = 0; seatNo < this.game.playerHands.length; seatNo++) {
      if (!this.game.playerHands[seatNo]) {
        continue;
      }
      for (let cardNo = 0; cardNo < this.game.playerHands[seatNo].cards.length; cardNo++) {
        let card = this.game.playerHands[seatNo].cards[cardNo];
        if (card) {
          document.getElementById(`card${seatNo}${cardNo}`).style.visibility = "visible";
          document.getElementById(`value${seatNo}${cardNo}`).innerHTML = card.value;
          document.getElementById(`suit${seatNo}${cardNo}`).className = card.suit;
        }
      }
    }
    document.getElementById("dealerCards").innerHTML = "";
    for(let cardNo = 0; cardNo < this.game.dealerHand.cards.length; cardNo++){
      let card = this.game.dealerHand.cards[cardNo];
      if (card) {
        if (cardNo === 1 && !this.game.dealerHitting) {
          document.getElementById("dealerCards").innerHTML +=
          `<img style="border-radius:10px" src="assets/card_back.jpg"/>`;
        } else {
          document.getElementById("dealerCards").innerHTML +=
            `<div class="dealerCard${cardNo} card">
            <div class="value" id = "dealerCard${cardNo}" > ${card.value}</div >
            <div class="${card.suit}" id="dealerCard${cardNo}"></div>
          </div >`;
        }
        
      }
    }
  }
}

export default BlackjackGameView;