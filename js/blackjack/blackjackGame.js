import Deck from "./deck";
import Hand from "./hand";
import DealerHand from "./dealerHand";

class BlackjackGame {
  constructor(render){
    this.betAmounts = [0, 0, 0];
    this.playerHands = [null, null, null];
    this.deck = new Deck(2);
    console.log(this.deck);
    this.dealerHand = null;
    this.render = render;
    this.dealerHitting = false;
    this.currentPlayerIndex = 0;
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
    this.currentPlayerIndex = -1;
    for(let i = 0; i < this.betAmounts.length; i++) {
      if (this.betAmounts[i] > 0) {
        if(this.currentPlayerIndex === -1){
          this.currentPlayerIndex = i;
        }
        this.playerHands[i] = new Hand();
      }
    }
    if (this.playerHands.filter((playerHand) => { return !!playerHand;}).length === 0) {
      return false;
    }
    this.dealerHand = new DealerHand();
    while(this.dealerHand.numOfCards() < 2) {
      this.dealerHand.receiveCard(this.deck.deal());
      this.playerHands.forEach((playerHand) => {
        if(playerHand){
          playerHand.receiveCard(this.deck.deal());
          this.render();
        }
      });
    }
    return true;
  }

  hit() {

    this.playerHands[this.currentPlayerIndex].receiveCard(this.deck.deal());
    this.render();
  }

  stand() {

  }

  double() {

  }

  split() {

  }
}

export default BlackjackGame;