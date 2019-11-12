import Deck from "./deck";
import Hand from "./hand";
import Card from "./card";
import DealerHand from "./dealerHand";

class BlackjackGame {
  constructor(render, blinkBalance) {
    this.betAmounts = [0, 0, 0];
    this.playerHands = [null, null, null];
    this.deck = new Deck(2);
    this.dealerHand = null;
    this.dealerHitting = false;
    this.render = render;
    this.blinkBalance = blinkBalance;
    this.currentPlayerIndex = 0;
    this.results = ["","",""];
  }

  clearBets() {
    for(let i = 0; i < this.betAmounts.length; i++){
      this.betAmounts[i] = 0;
    }
  }

  placeBet(seatNo, betAmount) {
    let sum = this.betAmounts.reduce((total, num) => {
      return total + num;
    })

    if (sum + betAmount > this.getCurrentBankroll()){
      return;
    }
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
    } else { //end
      this.setUpPlayerDecisionButtons();
      
      for(let i = 0; i < this.playerHands.length; i++){
        if(!this.playerHands[i]){
          continue;
        }
        if (this.playerHands[i].hasBlackjack()) {
          let bankroll = parseFloat(localStorage.getItem('bankroll'));
          bankroll += this.betAmounts[i] * 1.5;
          localStorage.setItem('bankroll', bankroll);
          this.blinkBalance();
          this.results[i] = "WIN";
          this.render();
        }
      }
      if(this.playerHands[this.currentPlayerIndex].hasBlackjack()){
        this.nextPlayer();
      }

      
    }
  }

  setUpDecisionButtons(setUpPlayerDecisionButtons){
    this.setUpPlayerDecisionButtons = setUpPlayerDecisionButtons;
  }

  dealDealerCard() { 
    this.dealerHand.receiveCard(this.deck.deal());
    this.render();
    setTimeout(() => {
      this.dealPlayerCards(0);
    }, 1000);
  }

  getCurrentBankroll() {
    let bankroll = parseFloat(localStorage.getItem('bankroll'));
    return bankroll;
  }

  hit() {
    
    this.playerHands[this.currentPlayerIndex].receiveCard(this.deck.deal());
    if (this.playerHands[this.currentPlayerIndex].isBusted()) {
      let bankroll = parseFloat(localStorage.getItem('bankroll'));
      bankroll -= this.betAmounts[this.currentPlayerIndex];
      localStorage.setItem('bankroll', bankroll);
      this.blinkBalance();
      this.results[this.currentPlayerIndex] = "LOSS";
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
    while(!this.playerHands[this.currentPlayerIndex] || this.playerHands[this.currentPlayerIndex].hasBlackjack()) {
      this.currentPlayerIndex++;
      if(this.currentPlayerIndex > this.playerHands.length) {
        this.dealerHits();
        return;
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
      if (!this.playerHands[i] || this.playerHands[i].hasBlackjack()) continue;

      if (!this.playerHands[i].isBusted()) {
        if(this.dealerHand.isBusted()){
          let bankroll = parseFloat(localStorage.getItem('bankroll'));
          bankroll += this.betAmounts[i];
          this.results[i] = "WIN";
          localStorage.setItem('bankroll', bankroll);
          this.blinkBalance();
        } else if (this.dealerHand.cardValue() > this.playerHands[i].cardValue()) {
          let bankroll = parseFloat(localStorage.getItem('bankroll'));
          bankroll -= this.betAmounts[i];
          this.results[i] = "LOSS";
          localStorage.setItem('bankroll', bankroll);
          this.blinkBalance();
        } else if (this.dealerHand.cardValue() < this.playerHands[i].cardValue()) {
          let bankroll = parseFloat(localStorage.getItem('bankroll'));
          bankroll += this.betAmounts[i];
          this.results[i] = "WIN";
          localStorage.setItem('bankroll', bankroll);
          this.blinkBalance();
        } else {
          this.results[i] = "PUSH";
        }
      }
    }
    setTimeout(() => {
      location.reload();
    },4000);
    this.render();
    
  }

}

export default BlackjackGame;