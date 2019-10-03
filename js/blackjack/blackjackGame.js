import Deck from "./deck";

class BlackjackGame {
  constructor(){
    this.betAmounts = [0, 0, 0];
    this.hands = [];
    this.deck = new Deck(2);
  }

  clearBets() {
    for(let i = 0; i < this.betAmounts.length; i++){
      this.betAmounts[i] = 0;
    }
  }

  placeBet(seatNo, betAmount) {
    this.betAmounts[seatNo] += betAmount;
  }

  getCurrentBetAmount(seatNo) {
    return this.betAmounts[seatNo];
  }

  deal() {

  }
}

export default BlackjackGame;