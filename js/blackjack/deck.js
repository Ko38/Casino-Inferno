//import Card from "./card";
const Card = require("./card");
class Deck {
  constructor(numOfDecks) {
    this.numOfDecks = numOfDecks;
    this.shuffle();
    this.roundOnBoard = 0;
    this.burnedNumOfCards = 0;
  }

  baccaratBurn() {
    let card = this.cards.shift();
    this.burnedNumOfCards = card.faceValue();
    for(let i = 0; i < this.burnedNumOfCards; i++){
      this.cards.shift();
    }
    return card;
  }

  shuffle() {
    this.cards = Card.allCards(this.numOfDecks);
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  removeNCards(value, n) {
    for(let i = 0; i < n; i++){
      this.removeOneCard(value);
    }
  }

  removeOneCard(value) {
    for(let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].value === value){
        this.cards.splice(i,1);
        break;
      }
    }
  }

  removeOneCardNotOneEyed(value) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].value === value && (this.cards[i].suit === "clubs" || this.cards[i].suit === "diamonds")) {
        this.cards.splice(i, 1);
        break;
      }
    }
  }

  removeOneCardOneEyed(value) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].value === value && (this.cards[i].suit === "spades" || this.cards[i].suit === "hearts")) {
        this.cards.splice(i, 1);
        break;
      }
    }
  }

  removeAllCardsWith(value) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].value === value) {
        this.cards.splice(i, 1);
      }
    }
  }

  print() {
    for(let card of this.cards) {
      console.log(card.suit, card.value);
    }
  }

  deal() {
    return this.cards.shift();
  }

  isCutCardOut(num = 26) {
    return this.cards.length <= num;
  }

  isOverRounds(rounds = 76) {
    return this.roundOnBoard >= rounds;
  }

  cardsLeft() {
    return this.cards.length;
  }

  decksLeftEstimatedByRounds() {
    return (52*8 - this.roundOnBoard*4.94 - 1) / 52;
  }

  decksLeft() {
    return (this.burnedNumOfCards + this.cardsLeft()) / 52;
  }
}
module.exports = Deck;
// export default Deck;