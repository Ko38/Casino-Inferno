const Deck = require("./js/blackjack/deck");
// 1 3 7 50 100 500
//one eyed - spades hearts
function insuranceLLSimulation(triggerCount = -5) {
  
  let hitInsurance = 0;
  let handsPlayed = 0;
  let lostHands = 0;

  let record = (card) => {
    handsPlayed++;
    if (card.value === "10" || card.value === "J" || card.value === "Q" || card.value === "K") {
      hitInsurance ++;
      return 2;
    } 
    lostHands++;
    return -1;
  }

  let counting = (card) => {
    if(card.value === "A" || card.value === "6"){
      return -1;
    } else if (card.value === "7" || card.value === "8") {
      return -2;
    } else if (card.value === "2" || card.value === "3" || card.value === "10"
          || card.value === "J" || card.value === "Q" || card.value === "K") {
      return 1;
    }
    return 0;
  }

  let units = 0;
  let betCount = 0;
  for(let i = 0; i < 10000000; i++ ){
    let deck = new Deck(2);
    let count = 0;
    while (!deck.isCutCardOut(52)) {
      let triggered = (count / deck.decksLeft()) <= triggerCount;

      let card = deck.deal();
      count += counting(card);
      let payout = record(card);
      if (triggered) {
        betCount++;
        units += payout;
      }
    }
  }
  console.log(`unitsWon:${units}`);
  console.log(`Bet ${betCount} times`);
  console.log(`Watched ${handsPlayed} rounds`);   
  console.log(`EV: ${units/betCount}`);
  console.log(`BetFrequency: ${betCount/handsPlayed}`);

  console.log(`hitInsurance: ${hitInsurance}`);
  console.log(`lostHands:${lostHands}`);
}


for(let i = -4; i > -10; i--) {
  console.log(`triggerCount: ${i}`);
  insuranceLLSimulation(i);
  console.log("\n");
}



// triggerCount: -6
// unitsWon: 968191
// Bet 26092622 times
// Watched 530000000 rounds
// EV: 0.037105929791187715
// BetFrequency: 0.049231362264150945
// hitInsurance: 163100705
// lostHands: 366899295