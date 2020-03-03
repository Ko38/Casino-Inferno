const Deck = require("./js/blackjack/deck");
// 1 3 7 50 100 500
//one eyed - spades hearts
function baccaratSimulation(cardValueRemoved) {
  
  let hitGrandMonkey = 0;
  let missedGrandMonkey = 0;
  let handsPlayed = 0;
  let hitN9BeatsN8 = 0;
  let missedN9BeatsN8 = 0;
  let bankerWin = 0;
  let playerWin = 0;
  let tie = 0;

 

  let counting = (card) => {
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
  for(let i = 0; i < 1000000; i++ ){
    let deck = new Deck(8);
    if (cardValueRemoved){
      deck.removeNCards(cardValueRemoved, 8);
    }
    
    let count = 0;
    while (!deck.isCutCardOut(26)) {
      

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

      let settlePicturePicture = (playerCard1, playerCard2, bankerCard1, bankerCard2, playerCard3, bankerCard3) => {
        if(!bankerCard3){
          return -1;
        }
        if(bankerCard3.value === "J" || bankerCard3.value === "Q" || bankerCard3.value === "K") {
          return 8;
        }
        return -1;
      };

      

      let playerTotal = getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue());
      let bankerTotal = getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue());

      if (playerTotal >= 8 || bankerTotal >= 8) {
        settleBaccarat(playerTotal, bankerTotal);
        let payout = settlePicturePicture(playerCard1, playerCard2, bankerCard1, bankerCard2, undefined, undefined);
        // if(triggered){
          units += payout;
          betCount++;
        // }
        
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
      let payout = settlePicturePicture(playerCard1, playerCard2, bankerCard1, bankerCard2, playerCard3, bankerCard3);
      // if(triggered){
        units += payout;
        betCount++;
      // }
      
    }
  }
  
  console.log(`After removing ${cardValueRemoved}`);
  console.log(`unitsWon:${units}`);
  console.log(`Bet ${betCount} times`);
  console.log(`Watched ${handsPlayed} rounds`);
  console.log(`EV: ${units / betCount}`);
  console.log(`BetFrequency: ${betCount / handsPlayed}`);
  // console.log(`hitGrandMonkey:${hitGrandMonkey}`);
  // console.log(`missedGrandMonkey:${missedGrandMonkey}`);
  // console.log(`hands:${handsPlayed}`);
  // console.log(`grandMonkeyProbability: ${hitGrandMonkey / handsPlayed}`);
  // console.log(`EV:${5000 * (hitGrandMonkey / handsPlayed) - (missedGrandMonkey / handsPlayed)}`);
  // console.log("\n");
}



for (let value of ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J"]){
  baccaratSimulation(value);
}
// for (let value of ["8", "J"]) {
//   baccaratSimulation(value);
// }


// baccaratSimulation();

//wizard of odds EV: -0.3322
//after removing A~10: -0.232 EOR: 0.10
//after removing J: -0.48641754018271954  EOR: -0.15


//EV -0.09624

//A removed: -0.0822766  EOR: 
//2 removed: -0.08695422
//3 removed: -0.08634
//4 removed: -0.08510
//5 removed: -0.07745
//6 removed: -0.07605
//7 removed: -0.07635
//8 removed: -0.05101328
//9 removed: -0.05686
//10 removed: -0.0821
//J removed: -0.160089859367

// A	-0.09624	-0.0822766	0.0139634	0.01	1	
// 2	-0.09624	-0.08695422	0.00928578	0.01	0	
// 3	-0.09624	-0.08634	0.0099	0.01	1	
// 4	-0.09624	-0.0851	0.01114	0.01	1	
// 5	-0.09624	-0.07745	0.01879	0.02	2	1
// 6	-0.09624	-0.07605	0.02019	0.02	2	1
// 7	-0.09624	-0.07635	0.01989	0.02	2	1
// 8	-0.09624	-0.05101328	0.04522672	0.4	4	2
// 9	-0.09624	-0.05686	0.03938	0.4	4	2
// 10	-0.09624	-0.0821	0.01414	0.015	1	2
// J	-0.09624	-0.160089859367	-0.063849859367	-0.06	-6	-3
// Q	-0.09624	-0.160089859367	-0.063849859367	-0.06	-6	-3
// K	-0.09624	-0.160089859367	-0.063849859367	-0.06	-6	-3
