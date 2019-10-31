import Deck from "./deck";
import Hand from "./hand";
import Card from "./card";
import DealerHand from "./dealerHand";

class BlackjackGame {
  constructor(render) {
    this.betAmounts = [0, 0, 0];
    this.playerHands = [null, null, null];
    this.deck = new Deck(2);
    this.dealerHand = null;
    this.dealerHitting = false;
    this.render = render;
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


    // while(this.dealerHand.numOfCards() < 2) {
    //   this.dealerHand.receiveCard(this.deck.deal());
    //   this.playerHands.forEach((playerHand) => {
    //     if(playerHand){
    //       playerHand.receiveCard(this.deck.deal());
    //       this.render();
    //     }
    //   });
    // }
    this.dealPlayerCards(0);
    return true;
  }

  dealPlayerCards(index) {
    if(this.dealerHand.numOfCards() < 2) {
      if (this.playerHands[index]) {
        this.playerHands[index].receiveCard(this.deck.deal());
        this.render();
      } 
      
      if(index >= this.playerHands.length){
        setTimeout(() => {
          this.dealDealerCard();
        }, 1000);
      } else if (!this.playerHands[index]) {
        this.dealPlayerCards(index + 1);
      } else {
        setTimeout(() => {
          this.dealPlayerCards(index+1);
        }, 1000);
      }
    } 
  }

  dealDealerCard() { 
    this.dealerHand.receiveCard(this.deck.deal());
    this.render();
    setTimeout(() => {
      this.dealPlayerCards(0);
    }, 1000);
  }

  hit() {
    
    this.playerHands[this.currentPlayerIndex].receiveCard(this.deck.deal());
    if (this.playerHands[this.currentPlayerIndex].isBusted()) {
      let bankroll = parseFloat(localStorage.getItem('bankroll'));
      bankroll -= this.betAmounts[this.currentPlayerIndex];
      localStorage.setItem('bankroll', bankroll);
      this.render();
      this.nextPlayer();
    }


    this.render();
  }

  stand() {
    this.nextPlayer();
  }

  double() {

  }

  split() {

  }

  nextPlayer() {
    this.currentPlayerIndex++;
    while(!this.playerHands[this.currentPlayerIndex]) {
      this.currentPlayerIndex++;
      if(this.currentPlayerIndex > this.playerHands.length) {
        this.dealerHits();
        break;
      }
    }
  }

  dealerHits() {
    this.dealerHitting = true;
    this.render();
    setTimeout(() => {
      if (this.dealerHand.has17()) {
        this.settle();
      } else {
        this.dealerHand.receiveCard(this.deck.deal());
        this.render();
        this.dealerHits();
      }
    }, 1000);
  }

  settle() {
    for(let i = 0; i <  this.playerHands.length; i++) {
      if (!this.playerHands[i]) continue;
      if (!this.playerHands[i].isBusted()) {
        if(this.dealerHand.isBusted()){
          let bankroll = parseFloat(localStorage.getItem('bankroll'));
          bankroll += this.betAmounts[i];
          localStorage.setItem('bankroll', bankroll);
        } else if (this.dealerHand.cardValue() > this.playerHands[i].cardValue()) {
          let bankroll = parseFloat(localStorage.getItem('bankroll'));
          bankroll -= this.betAmounts[i];
          localStorage.setItem('bankroll', bankroll);
        } else if (this.dealerHand.cardValue() < this.playerHands[i].cardValue()) {
          let bankroll = parseFloat(localStorage.getItem('bankroll'));
          bankroll += this.betAmounts[i];
          localStorage.setItem('bankroll', bankroll);
        }
      }
    }
    setTimeout(() => {
      location.reload();
    },1000);
    this.render();
    
  }

}

export default BlackjackGame;