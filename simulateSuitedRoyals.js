const Deck = require("./js/blackjack/deck");

function suitedRoyalsSimulation(triggerCount = 2) {
  
  let hitInsurance = 0;
  let handsPlayed = 0;
  let lostHands = 0;

  let getNum = (value) => {
    if(value ==="J" || value === "Q" || value === "K" ){
      return 10;
    } else if (value === "A") {
      return 1;
    }
    return parseInt(value);
  }

  let calculateValue = (card1, card2, card3) => {
    let hasAce = card1.value === "A" || card2.value === "A" || card3.value === "A";

    let sum = getNum(card1.value) + getNum(card2.value) + getNum(card3.value);
    if(sum === 19 || sum === 20 || sum === 21) {
      return sum;
    }
    if (hasAce) {
      return sum + 10;
    }
    return sum;
  };

  let record = (card1, card2) => {
    handsPlayed++;
    if(card1.suit === "diamonds" && card2.suit === "diamonds" && 
    ((card1.value === "Q" && card2.value === "K") || (card2.value === "Q" && card1.value === "K"))) {
      return 50;
    } else if(card1.suit === card2.suit && 
    ((card1.value === "Q" && card2.value === "K") || (card2.value === "Q" && card1.value === "K"))) {
      return 25;
    } else if (card1.suit === card2.suit && card1.isFaceCard() && card2.isFaceCard()) {
      return 5;
    } else if (card1.suit === card2.suit){
      return 2;
    } 
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
  for(let i = 0; i < 2000000; i++ ){
    let deck = new Deck(1);
    let count = 0;
    while (!deck.isCutCardOut(26)) {
      let triggered = (count / deck.decksLeft()) >= triggerCount;

      let card1 = deck.deal();
      let card2 = deck.deal();
      //let card3 = deck.deal();
      // count += counting(card1);
      // count += counting(card2);
      // count += counting(card3);
      let payout = record(card1, card2);
      betCount++;
      units += payout;
      // if (triggered) {
      //   betCount++;
      //   units += payout;
      //   // if(units <= -200){
      //   //   return true;
      //   // }
      // }
    }
  }
  console.log(`unitsWon:${units}`);
  console.log(`Bet ${betCount} times`);
  console.log(`Watched ${handsPlayed} rounds`);   
  console.log(`EV: ${units/betCount}`);
  console.log(`BetFrequency: ${betCount/handsPlayed}`);

  // console.log(`hitInsurance: ${hitInsurance}`);
  // console.log(`lostHands:${lostHands}`);
}


// for(let i = -4; i > -10; i--) {
//   console.log(`triggerCount: ${i}`);
//   insuranceLLSimulation(i);
//   console.log("\n");
// }

// let bankruptTimes = 0;
// let totalRounds = 1000;
// for(let i = 0; i < totalRounds; i++){
//   if(luckyLuckySimulation()) {
//     bankruptTimes++;
//   }
  
// }

// console.log(`RoR ${bankruptTimes/totalRounds}`)


suitedRoyalsSimulation();



//2
// unitsWon: 315475
// Bet 18418466 times
// Watched 87000000 rounds
// EV: 0.01712819080590099
// BetFrequency: 0.21170650574712643
// hitInsurance: 0
// lostHands: 0


//3
// unitsWon: 398599
// Bet 12315444 times
// Watched 87000000 rounds
// EV: 0.03236578397011102
// BetFrequency: 0.14155682758620688
// hitInsurance: 0
// lostHands: 0

//4
// unitsWon: 410020
// Bet 8387730 times
// Watched 87000000 rounds
// EV: 0.04888330931014708
// BetFrequency: 0.09641068965517241
// hitInsurance: 0
// lostHands: 0

//5
// unitsWon: 366527
// Bet 5691186 times
// Watched 87000000 rounds
// EV: 0.06440256916572398
// BetFrequency: 0.06541593103448276
// hitInsurance: 0
// lostHands: 0