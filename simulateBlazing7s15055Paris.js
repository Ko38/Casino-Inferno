const Deck = require("./js/blackjack/deck");
// 1 3 7 50 100 500
//one eyed - spades hearts
function baccaratSimulation(cardValueRemoved, triggerTrueCount, bankrollSize) {
  
  let handsPlayed = 0;
  let bankerWin = 0;
  let playerWin = 0;
  let tie = 0;

  let counting = (card) => {
    if(card.value === "A" || card.value === "J" || card.value === "Q" || card.value === "K" ) { 
      return 1;
    } else if (card.value === "8" || card.value === "9") {
      return 3;
    } else if (card.value === "4") {
      return -1;
    } else if (card.value === "7") {
      return -9;
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

  let units = 0;
  let betCount = 0;
  for(let i = 0; i < 2000000; i++ ){
    let deck = new Deck(8);
    if (cardValueRemoved){
      deck.removeNCards(cardValueRemoved, 8);
    }
    
    let count = 0;
    while (!deck.isCutCardOut(26)) {
      
      let triggered = count / deck.decksLeft() >= triggerTrueCount;
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

      let settleBlazing7s = (playerCard1, playerCard2, bankerCard1, bankerCard2, playerCard3, bankerCard3) => {
        if(bankerCard3 && playerCard3 && 
          getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue() + playerCard3.faceValue()) === 7 &&
          getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue() + bankerCard3.faceValue()) === 7
          ){
          return 150;
        }
        if(!bankerCard3 && !playerCard3 && 
          getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue()) === 7 &&
          getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue()) === 7) {
            return 55;
          }
        return -1;
      };

      

      let playerTotal = getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue());
      let bankerTotal = getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue());

      if (playerTotal >= 8 || bankerTotal >= 8) {
        settleBaccarat(playerTotal, bankerTotal);
        let payout = settleBlazing7s(playerCard1, playerCard2, bankerCard1, bankerCard2, undefined, undefined);
        if(triggerTrueCount && triggered){
          units += payout;
          betCount++;
        } else if(!triggerTrueCount){
          units += payout;
          betCount++;
        }
        if(bankrollSize &&  bankrollSize + units <= 0){
           return units;
        }
        
        continue;
      }

      let playerDrawn = false;
      let playerCard3 = undefined;

      if(playerTotal <= 5) {
        playerCard3 = deck.deal();
        count += counting(playerCard3);
        playerDrawn = true;
      }
      
      if (playerCard3) {
        playerTotal = getBaccaratActualValue(playerTotal + playerCard3.faceValue());
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
      let payout = settleBlazing7s(playerCard1, playerCard2, bankerCard1, bankerCard2, playerCard3, bankerCard3);
      if(triggerTrueCount && triggered){
        units += payout;
        betCount++;
      } else if (!triggerTrueCount){
        units += payout;
        betCount++;
      }
      if(bankrollSize && bankrollSize + units <= 0){
        return units;
      }
      
    }
  }
  if(bankrollSize){
    return units;

  }
  console.log(`After removing ${cardValueRemoved}`);
  console.log(`triggerCount:${triggerTrueCount}`);
  console.log(`unitsWon:${units}`);
  console.log(`Bet ${betCount} times`);
  console.log(`Watched ${handsPlayed} rounds`);
  console.log(`EV: ${units / betCount}`);
  console.log(`BetFrequency: ${betCount / handsPlayed}`);
  console.log("\n");
  // console.log(`hitGrandMonkey:${hitGrandMonkey}`);
  // console.log(`missedGrandMonkey:${missedGrandMonkey}`);
  // console.log(`hands:${handsPlayed}`);
  // console.log(`grandMonkeyProbability: ${hitGrandMonkey / handsPlayed}`);
  // console.log(`EV:${5000 * (hitGrandMonkey / handsPlayed) - (missedGrandMonkey / handsPlayed)}`);
  // console.log("\n");
}

// baccaratSimulation(9, 500);
// baccaratSimulation(10, 500);





// for (let value of ["7", "8", "9", "10", "J"]){
//   baccaratSimulation(value, 10, 500);
// }

// for(let units of [900,1000,1100,1200,1300,1400,1500]){
//   let a = [];
//   for(let i = 0; i < 3000; i++){
//     a.push(baccaratSimulation(undefined, 6, units));
//   }
//   console.log(`units:${units}`);
//   console.log(`ROR:${a.filter(x => x <= -units).length/3000}`);
// }




// for (let value of ["8", "J"]) {
//   baccaratSimulation(value);
// }
// baccaratSimulation();
// baccaratSimulation("A");
// baccaratSimulation("2");
// baccaratSimulation("3");
// baccaratSimulation("4");
// baccaratSimulation("5");
// baccaratSimulation("6");
// baccaratSimulation("7");
// baccaratSimulation("8");
// baccaratSimulation("9");
// baccaratSimulation("10");
baccaratSimulation(undefined, 12);
baccaratSimulation(undefined, 13);
baccaratSimulation(undefined, 14);

// baccaratSimulation();


// unitsWon:-18784406
// Bet 238742360 times
// Watched 238742360 rounds
// EV: -0.07868065809519517
// BetFrequency: 1

//A Removed: -0.06272
//2 Removed: -0.0857639
//3 Removed: -0.09229598
//4 Removed: -0.0943697798
//5 Removed: -0.08973044367967
//6 Removed: -0.08343938979
//7 Removed: -0.188162
//8 Removed: -0.039132
//9 Removed: -0.0398096
//10Removed: -0.055611413


// triggerCount:6
// unitsWon:1390963
// Bet 11927978 times
// Watched 79578272 rounds
// EV: 0.11661347799266565
// BetFrequency: 0.14988988451521038



// triggerCount:6
// unitsWon:4206339
// Bet 35774925 times
// Watched 238738322 rounds
// EV: 0.11757785655735127
// BetFrequency: 0.14984994742486293