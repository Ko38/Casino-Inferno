const Deck = require("./js/blackjack/deck");

function luckyLadiesSimulation(triggerCount = 2) {
  
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

  let record = (card1, card2, card3, card4) => {
    let dealerHasBlackjack = (card1.value === "A" && (card2.value === "10" || card2.value === "J" || card2.value === "Q" || card2.value === "K"))
      || (card2.value === "A" && (card1.value === "10" || card1.value === "J" || card1.value === "Q" || card1.value === "K"));
    
    let queenOfHearts = (card3.value === "Q" && card4.value === "Q" && card3.suit === "hearts" && card4.suit === "hearts");
    let suited = card3.suit === card4.suit;
    let hasTwenty = ((card3.value === "10" || card3.value === "J" || card3.value === "Q" || card3.value === "K") &&
      (card4.value === "10" || card4.value === "J" || card4.value === "Q" || card4.value === "K")) ||
      (card3.value === "9" && card4.value === "A") || (card4.value === "9" && card3.value === "A") ;
    let matched = card3.value === card4.value && card3.suit === card4.suit;

    if(dealerHasBlackjack && queenOfHearts){
      return 1000;
    } else if (queenOfHearts){
      return 125;
    } else if (matched && hasTwenty){
      return 19;
    } else if (suited && hasTwenty){
      return 9
    } else if (hasTwenty){
      return 4;
    }
    return -1;
  }

  let counting = (card) => {
    if(card.value === "A"){
      return -1;
    } else if (card.value === "10" || card.value=== "J" || card.value === "Q" || card.value === "K"){
      return -2;
    } else if (card.value === "2" || card.value === "3" || card.value === "7" ){
      return 1;
    } else if (card.value === "4" || card.value === "5" || card.value === "6") {
      return 2;
    }
    return 0;
  }

  let units = 0;
  let betCount = 0;
  for(let i = 0; i < 10000000; i++ ){
    let deck = new Deck(2);
    let count = 0;
    while (!deck.isCutCardOut(52)) {
      let triggered = (count / deck.decksLeft()) >= triggerCount;
      handsPlayed++;
      let card1 = deck.deal();
      let card2 = deck.deal();
      let card3 = deck.deal();
      let card4 = deck.deal();
      count += counting(card1);
      count += counting(card2);
      count += counting(card3);
      count += counting(card4);
      let payout = record(card1, card2, card3, card4);
      if (triggered) {
        betCount++;
        units += payout;
      }
    }
  }
  console.log(`triggerCount:${triggerCount}`);
  console.log(`unitsWon:${units}`);
  console.log(`Bet ${betCount} times`);
  console.log(`Watched ${handsPlayed} rounds`);   
  console.log(`EV: ${units/betCount}`);
  console.log(`BetFrequency: ${betCount/handsPlayed}`);
}


// for(let i = -4; i > -10; i--) {
//   console.log(`triggerCount: ${i}`);
//   insuranceLLSimulation(i);
//   console.log("\n");
// }

luckyLadiesSimulation(13);
luckyLadiesSimulation(14);
luckyLadiesSimulation(15);
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