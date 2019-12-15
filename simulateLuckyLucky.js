const Deck = require("./js/blackjack/deck");
let currentTime = new Date();

function luckyLuckySimulation(triggerCount = 2, system2 = true, cutCard, suited21Payout, suited678PayOut, bankroll) {
  
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

  let record = (card1, card2, card3) => {
    handsPlayed++;
    let suited = card1.suit === card2.suit && card2.suit === card3.suit && card1.suit === card3.suit;
    let sixSevenEight = (card1.value === "6" && card2.value === "7" && card3.value === "8") ||
      (card1.value === "6" && card2.value === "8" && card3.value === "7") ||
      (card1.value === "7" && card2.value === "6" && card3.value === "8") || 
      (card1.value === "7" && card2.value === "8" && card3.value === "6") ||
      (card1.value === "8" && card2.value === "6" && card3.value === "7") ||
      (card1.value === "8" && card2.value === "7" && card3.value === "6");

    if (suited && card1.value === "7" && card2.value === "7" && card3.value === "7") {
      return 299;
    } else if (suited && sixSevenEight) {
      return suited678PayOut;
    } else if (card1.value === "7" && card2.value === "7" && card3.value === "7") {
      return 50;
    } else if (sixSevenEight) {
      return 30;
    } else if (calculateValue(card1, card2, card3) === 21 && suited) {
      return suited21Payout;
    } else if (calculateValue(card1, card2, card3) === 21) {
      return 3;
    } else if (calculateValue(card1, card2, card3) === 20) {
      return 2;
    } else if (calculateValue(card1, card2, card3) === 19) {
      return 2;
    }
    return -1;
  }

  let counting = (card) => {
    if (system2){
      if(card.value === "A" || card.value === "6"){
        return -1;
      } else if (card.value === "7" || card.value === "8") {
        return -2;
      } else if (card.value === "2" || card.value === "3" || card.value === "10"
            || card.value === "J" || card.value === "Q" || card.value === "K") {
        return 1;
      }
      return 0;
    } else {
      if (card.value === "A" || card.value === "6" || card.value === "8") {
        return -2;
      } else if (card.value === "7"){
        return -3;
      } 
      return 1;
    }
  }

  let units = 0;
  let betCount = 0;
  for(let i = 0; i < 2000000; i++ ){
    let deck = new Deck(2);
    let count = 0;
    while (!deck.isCutCardOut(cutCard)) {
      let triggered = (count / deck.decksLeft()) >= triggerCount;

      let card1 = deck.deal();
      let card2 = deck.deal();
      let card3 = deck.deal();
      count += counting(card1);
      count += counting(card2);
      count += counting(card3);
      let payout = record(card1, card2, card3);
      if (triggered) {
        betCount++;
        units += payout;
        if(units < -bankroll){
          return units;
        }
        // if(units <= -200){
        //   return true;
        // }
      }
    }
    if (new Date() - currentTime > 60000) {
      // console.log(`Is System 2? ${system2}`);
      // console.log(`Trigger Count:${triggerCount}`);
      // console.log(`cutCard:${cutCard}`);
      // console.log(`suited21 payout: ${suited21Payout}`);
      // console.log(`suited678Payout:${suited678PayOut}`);
      // console.log(`unitsWon:${units}`);
      // console.log(`Bet ${betCount} times`);
      // console.log(`Watched ${handsPlayed} rounds`);   
      // console.log(`EV: ${units/betCount}`);
      // console.log(`BetFrequency: ${betCount/handsPlayed}`);
      // console.log("\n");
      currentTime = new Date();
    }
  }
  console.log(`Is System 2? ${system2}`);
  console.log(`Trigger Count:${triggerCount}`);
      console.log(`cutCard:${cutCard}`);
      console.log(`suited21 payout: ${suited21Payout}`);
      console.log(`suited678Payout:${suited678PayOut}`);
      console.log(`unitsWon:${units}`);
      console.log(`Bet ${betCount} times`);
      console.log(`Watched ${handsPlayed} rounds`);   
      console.log(`EV: ${units/betCount}`);
      console.log(`BetFrequency: ${betCount/handsPlayed}`);
      console.log("\n");
      return units;
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


// luckyLuckySimulation(3, true, 26, 10, 66+2/3);
// luckyLuckySimulation(4, true, 26, 10, 66+2/3);
// luckyLuckySimulation(5, true, 26, 10, 66+2/3);


let results = [];
// for(let i = 0; i < 3000; i++){
  results.push(luckyLuckySimulation(2,true, 52, 15, 100, 300));
// }

const losses = results.filter(x => x < 0).length;
console.log(`Losing Rate:${losses / results.length}`);
console.log(`[${results.join(",")}]`)
  
 



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