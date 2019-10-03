const SUITS = ["Spades", "Diamonds", "Hearts", "Clubs"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
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

export default Card;