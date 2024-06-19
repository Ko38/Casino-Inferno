const Deck = require("./js/blackjack/deck");





let currentTime = new Date();

function baccaratSimulation(cutCard, triggerCount = 32, bankroll=500) {
  
  let hitGrandMonkey = 0;
  let missedGrandMonkey = 0;
  let handsPlayed = 0;
  let hitN9BeatsN8 = 0;
  let missedN9BeatsN8 = 0;
  let bankerWin = 0;
  let playerWin = 0;
  let tie = 0;

 

  let counting = (card) => {

    if (card.value === "4" || card.value === "6" || card.value === "7" || card.value === "5") {
      return -1;
    } else if (card.value === "8"){
      return 2;
    } else if (card.value === "9"){
      return 2;
    } 
    else if (card.value === "A") {
      return 1;
    }
    return 0;
  };

  let getBaccaratActualValue = (num) => {
    return num % 10;
  };

  let shouldBankerDrawThird = (bankerTotalValue, playerThirdCardValue) => {
    if(bankerTotalValue <= 2) {
      return true;
    } else if (bankerTotalValue === 3) {
      if (playerThirdCardValue !== 8) {
        return true;
      }
    } else if (bankerTotalValue === 4) {
      if ([2,3,4,5,6,7].includes(playerThirdCardValue)){
        return true;
      }
    } else if (bankerTotalValue === 5) {
      if([4,5,6,7].includes(playerThirdCardValue)) {
        return true;
      }
    } else if (bankerTotalValue === 6) {
      if([6,7].includes(playerThirdCardValue)) {
        return true;
      }
    }
    return false;
  }

  let pandaUnits = 0;
  let dragonUnits = 0;
  let triggerCountUnits = 0;
  let triggerCountBetCount = 0;
  let dragonBetCount = 0;
  let pandaBetCount = 0;
  for(let i = 0; i < 300; i++ ){
    
    let deck = new Deck(8);
    // if (cardValueRemoved){
    //   deck.removeNCards(cardValueRemoved, 8);
    // }
    
    let count = 0;
    while (!deck.isCutCardOut(cutCard)) {
      let dragonTriggered = count >= triggerCount;
      let istriggerCount = count === triggerCount;
      deck.numOfRounds++;
      let playerCard1 = deck.deal();
      let bankerCard1 = deck.deal();
      let playerCard2 = deck.deal();
      let bankerCard2 = deck.deal();
      
      count += counting(playerCard1);
      count += counting(bankerCard1);
      count += counting(playerCard2);
      count += counting(bankerCard2);

      let settleBaccarat = (playerTotalValue, bankerTotalValue) => {
        
        if (playerTotalValue > bankerTotalValue) {
          playerWin++;
        } else if (playerTotalValue < bankerTotalValue) {
          bankerWin++;
        } else {
          tie++;
        }
        handsPlayed++;
      };

      let settleDragon7 = (bankCard3, bankerTotalValue, playerTotalValue) => {
        if(!bankCard3) {
          return -1;
        }

        if (bankerTotal === 7 && bankerTotalValue > playerTotalValue) {
          return 39.8;
        }
        return -1;
      };

      let settlePanda8 = (playerCard3, bankerTotalValue, playerTotalValue) => {
        if(!playerCard3) {
          return -1;
        }

        if (playerTotalValue === 8 && bankerTotalValue < playerTotalValue) {
          return 25;
        }
        return -1;
      };

      let settleGrandMonkey = (card1, card2, card3, card4, card5, card6) => {
        if (!card5 || !card6) {
          missedGrandMonkey++;
        } else if (card1.isMonkey() && card2.isMonkey() && card3.isMonkey()
          && card4.isMonkey() && card5.isMonkey() && card6.isMonkey()) {
          hitGrandMonkey++;
        } else {
          missedGrandMonkey++;
        }
        
      };

      let settleNatural9BeatsNatural8 = (playerCard1, bankerCard1, playerCard2, bankerCard2, playerCard3, bankerCard3) => {
        if(card5){
          missedN9BeatsN8++;
          return;
        } else if (card6) {
          missedN9BeatsN8++;
          return;
        } 
        let playerTotal = getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue());
        let bankerTotal = getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue());
        if(playerTotal === 8 && bankerTotal === 9) {
          hitN9BeatsN8++;
        } else if (bankerTotal === 8 && playerTotal === 9) {
          hitN9BeatsN8++;
        } else {
          missedN9BeatsN8;
        }
      };


      let playerTotal = getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue());
      let bankerTotal = getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue());

      if (playerTotal >= 8 || bankerTotal >= 8) {
        settleBaccarat(playerTotal, bankerTotal);
        settleGrandMonkey(playerCard1, playerCard2, bankerCard1, bankerCard2, undefined, undefined);
        let dragonPayout = settleDragon7(undefined, bankerTotal, playerTotal);
        let pandaPayout = settlePanda8(undefined, bankerTotal, playerTotal);
        
        if (dragonTriggered) {
          dragonBetCount++;
          dragonUnits += dragonPayout;
          // if(dragonUnits < -bankroll){
          //   return dragonUnits;
          // }
          if(istriggerCount){
            triggerCountUnits += dragonPayout;
            triggerCountBetCount++;
          }
        }
        continue;
      }

      let playerDrawn = false;
      let playerCard3 = undefined;

      if(playerTotal <= 5) {
        playerCard3 = deck.deal();
        playerDrawn = true;
      }
      
      if (playerCard3) {
        playerTotal = getBaccaratActualValue(playerTotal + playerCard3.faceValue());
        count += counting(playerCard3);
      }
      
      let bankerCard3 = undefined;
      if(playerDrawn) {
        if (shouldBankerDrawThird(bankerTotal, playerCard3.faceValue())) {
          bankerCard3 = deck.deal();
        }
      } else if (bankerTotal <= 5) {
        bankerCard3 = deck.deal();
      }

      if (bankerCard3){
        bankerTotal = getBaccaratActualValue(bankerTotal + bankerCard3.faceValue());
        count += counting(bankerCard3);
      }

      settleBaccarat(playerTotal, bankerTotal);
      let dragonPayout = settleDragon7(bankerCard3, bankerTotal, playerTotal);
      // let pandaPayout = settlePanda8(playerCard3, bankerTotal, playerTotal);
      // if (pandaTriggered) {
      //   pandaBetCount++;
      //   pandaUnits += pandaPayout;
      // }
      if (dragonTriggered) {
        dragonBetCount++;
        dragonUnits += dragonPayout;
        // if(dragonUnits < -bankroll){
        //   return dragonUnits;
        // }
        if(istriggerCount){
          triggerCountUnits += dragonPayout;
          triggerCountBetCount++;
        }
      }
    }

    // if(new Date() - currentTime > 60000) {
    //   console.log("-----Dragon----------");
    //   console.log(`trigger:${triggerCount}`);
    //   console.log(`cutCard:${cutCard}`);
    //   console.log(`unitsWon:${dragonUnits}`);
    //   console.log(`Bet ${dragonBetCount} times`);
    //   console.log(`Watched ${handsPlayed} rounds`);
    //   console.log(`EV: ${dragonUnits / dragonBetCount}`);
    //   console.log(`BetFrequency: ${dragonBetCount / handsPlayed}`);
    //   console.log("-----TriggerCount----------");
    //   console.log(`unitsWon:${triggerCountUnits}`);
    //   console.log(`Bet ${triggerCountBetCount} times`);
    //   console.log(`EV: ${triggerCountUnits / triggerCountBetCount}`);
    //   console.log("\n");
    //   currentTime = new Date();
    // }
    
  }
  // console.log(`After removing ${cardValueRemoved}`);
  // console.log(`hitGrandMonkey:${hitGrandMonkey}`);
  // console.log(`missedGrandMonkey:${missedGrandMonkey}`);
  // console.log(`hands:${handsPlayed}`);
  // console.log(`grandMonkeyProbability: ${hitGrandMonkey / handsPlayed}`);
  // console.log(`EV:${5000 * (hitGrandMonkey / handsPlayed) - (missedGrandMonkey / handsPlayed)}`);
  // console.log("\n");


  // console.log("-----Dragon----------");
  // console.log(`trigger:${triggerCount}`);
  // console.log(`cutCard:${cutCard}`);
  // console.log(`unitsWon:${dragonUnits}`);
  // console.log(`unitsWon/Shoe:${dragonUnits/2000000}`);
  // console.log(`Bet ${dragonBetCount} times`);
  // console.log(`Watched ${handsPlayed} rounds`);
  // console.log(`EV: ${dragonUnits / dragonBetCount}`);
  // console.log(`BetFrequency: ${dragonBetCount / handsPlayed}`);
  // console.log("-----Count 32----------");
  // console.log(`unitsWon:${triggerCountUnits}`);
  // console.log(`Bet ${triggerCountBetCount} times`);
  // console.log(`EV: ${triggerCountUnits / triggerCountBetCount}`);
  // console.log("\n");
  return dragonUnits;
}



// for (let value of ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10"]){
//   baccaratSimulation(value);
// }

// baccaratSimulation(31, 13);
// baccaratSimulation(31, 26);
// baccaratSimulation(32, 13);
// baccaratSimulation(32, 26);
// baccaratSimulation(32, 39);
// baccaratSimulation(33, 13);
// baccaratSimulation(33, 26);
//baccaratSimulation(13);
//baccaratSimulation(52);
//baccaratSimulation(39);

// let results = [];
// for(let i = 0; i < 3000; i++){
//   results.push(baccaratSimulation(39,32,1000));
// }

// const losses = results.filter(x => x < 0).length;
// console.log(`Losing Rate:${losses / results.length}`);
// console.log(`[${results.join(",")}]`)
// baccaratSimulation(13,32)
// baccaratSimulation(26,32)

let results = [];
for (let i = 0; i < 10000; i++){
  results.push(baccaratSimulation(39,32));
}


console.log(`[${results.join(",")}]`);

//wizard of odds EV: -0.3322
//after removing A~10: -0.232 EOR: 0.10
//after removing J: -0.48641754018271954  EOR: -0.15

