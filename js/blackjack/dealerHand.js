import Card from "./card";
import Hand from "./hand";

class DealerHand extends Hand {
  constructor() {
    super();
  }

  has17() {
    return this.cardValue() >= 17;
  }

  firstCardValue(){
    if(!this.cards[0]){
      return "";
    }
    let value = this.cards[0].value;
    if(value === "A"){
      return 11;
    } else if (value === "J" || value === "Q" || value === "K") {
      return 10;
    } 

    return value;
  }
}

export default DealerHand;