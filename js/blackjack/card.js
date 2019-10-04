const SUITS = ["spades", "diamonds", "hearts", "clubs"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  isJack() {
    return this.value === "J";
  }

  isOneEyed() {
    return this.suit === "hearts" || this.suit === "spades";
  }

  isOneEyedJack() {
    return this.isJack() && this.isOneEyed();
  }

  static allCards(numOfDecks = 1){
    let cards = [];
    for(let i = 0; i < numOfDecks; i++) {
      for(let suit of SUITS) {
        for(let value of VALUES) {
          cards.push(new Card(suit, value));
        }
      }
    }
    return cards;
  }
}
module.exports = Card;
// export default Card;