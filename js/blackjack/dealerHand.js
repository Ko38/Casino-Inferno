import Card from "./card";
import Hand from "./hand";

class DealerHand extends Hand {
  constructor() {
    super();
  }

  has17() {
    console.log(this.cardValue());
    return this.cardValue() >= 17;
  }
}

export default DealerHand;