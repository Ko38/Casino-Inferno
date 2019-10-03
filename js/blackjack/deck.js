import Card from "./card";

class Deck {
  constructor(numOfDecks) {
    this.numOfDecks = numOfDecks;
    this.shuffle();
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

  print() {
    for(let card of this.cards) {
      console.log(card.suit, card.value);
    }
  }

  deal() {
    return this.cards.shift();
  }

  isCutCardOut(num = 26) {
    return this.cards.length < num;
  }
}

export default Deck;