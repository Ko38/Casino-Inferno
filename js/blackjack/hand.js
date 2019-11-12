import Card from "./card";

class Hand {
  constructor() {
    this.cards = [];
  }

  hasBlackjack() {
    if(this.cards.length !== 2) {
      return false;
    }

    if (this.cards[0].value === "A" && (this.cards[1].value === "10" || this.cards[1].value === "J" ||
      this.cards[1].value === "Q" || this.cards[1].value === "K")){
        return true;
    } else if (this.cards[1].value === "A" && (this.cards[0].value === "10" || this.cards[0].value === "J" ||
      this.cards[0].value === "Q" || this.cards[0].value === "K")) {
      return true;
    }
    return false;
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
      } else if (value === "J" || value === "Q" || value === "K") {
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