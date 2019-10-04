import Card from "./card";

class Hand {
  constructor() {
    this.cards = [];
  }

  receiveCard(card) {
    this.cards.push(card);
  }

  numOfCards() {
    return this.cards.length;
  }

  cardValue() {
    let hasAce = this.cards.filter((card) => {
      return card.value === "A"
    }).length > 0;
    let totalValue = 0;
    for(let card of this.cards) {
      let value = card.value;
      if(value === "A"){
        totalValue++;
      } else if (value === "J" && value === "Q" && value === "K") {
        totalValue += 10;
      } else {
        totalValue += parseInt(value);
      }
    }
    if (totalValue <= 11 && hasAce){
      totalValue += 10;
    }
    return totalValue;
  }

  isBusted() {
    return this.cardValue() > 21;
  }
}

export default Hand;