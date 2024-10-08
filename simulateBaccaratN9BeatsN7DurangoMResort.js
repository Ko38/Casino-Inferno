const Deck = require("./js/blackjack/deck");
// 1 3 7 50 100 500
//one eyed - spades hearts
let currentTime = new Date();

function baccaratSimulation(numOfShoes = 20000000, const97Payout = 50, cutCardMin = 33, cutCardMax = 42, triggerTrueCount = 6.5) {

  let handsPlayed = 0;
  let hitN9BeatsN8 = 0;
  let missedN9BeatsN8 = 0;
  let bankerWin = 0;
  let playerWin = 0;
  let tie = 0;
 

  let counting = (card) => {
    if(card.value === "9" ){
      return -6;
    } else if (card.value === "7"){
      return -5;
    }
    return 1;
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
  for(let i = 0; i < numOfShoes; i++ ){
    let deck = new Deck(8);
    // if (cardValueRemoved){
    //   deck.removeNCards(cardValueRemoved, 8);
    // }
    
    let cutCard = Math.floor(Math.random() * (cutCardMax-cutCardMin+1)) + cutCardMin;
    let burnCard = deck.baccaratBurn();
    let count = 0;
    count += counting(burnCard);
    let lastRound = false;

    while (!lastRound) {
      lastRound = deck.isCutCardOut(cutCard);
      let triggered = (count / deck.decksLeft()) >= triggerTrueCount;
      // let triggered = false;
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


      let settleNatural9BeatsNatural8 = (playerCard1, bankerCard1, playerCard2, bankerCard2, playerCard3, bankerCard3) => {
        if (playerCard3){
          missedN9BeatsN8++;
          return -1;
        } else if (bankerCard3) {
          missedN9BeatsN8++;
          return -1;
        } 
        let playerTotal = getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue());
        let bankerTotal = getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue());
        if(playerTotal === 7 && bankerTotal === 9) {
          hitN9BeatsN8++;
          return 49.75;
        } else if (bankerTotal === 7 && playerTotal === 9) {
          hitN9BeatsN8++;
          return 49.75;
        } else {
          missedN9BeatsN8++;
          return -1;
        }
      };


      let playerTotal = getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue());
      let bankerTotal = getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue());

      if (playerTotal >= 8 || bankerTotal >= 8) {
        settleBaccarat(playerTotal, bankerTotal);
        let payout = settleNatural9BeatsNatural8(playerCard1, bankerCard1, playerCard2, bankerCard2, undefined, undefined);
        if (triggered) {
          betCount++;
          units += payout;
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
      let payout = settleNatural9BeatsNatural8(playerCard1, bankerCard1, playerCard2, bankerCard2, playerCard3, bankerCard3);
      if (triggered) {
        betCount++;
        units += payout;
      }
    }
    if(new Date() - currentTime > 60000) {
      console.log(`After ${i+1} Shoes`)
      console.log("-----N9beatsN7----------");
      console.log(`triggerTrueCount:${triggerTrueCount}`);
      console.log(`cutCard: ${cutCardMin} ~ ${cutCardMax}`);
      console.log(`const97Payout:${const97Payout}`);
      console.log(`unitsWon:${units}`);
      console.log(`unitsWon/Shoe:${units/(i+1)}`);
      console.log(`Bet ${betCount} times`);
      console.log(`Watched ${handsPlayed} rounds`);
      console.log(`EV: ${units / betCount}`);
      console.log(`BetFrequency: ${betCount / handsPlayed}`);
      console.log("\n");
      currentTime = new Date();
    }
      
  }
  console.log("-----N9beatsN7----------");
  console.log(`triggerTrueCount:${triggerTrueCount}`);
  console.log(`cutCard: ${cutCardMin} ~ ${cutCardMax}`);
  console.log(`const97Payout:${const97Payout}`);
  console.log(`unitsWon:${units}`);
  console.log(`unitsWon/Shoe:${units/numOfShoes}`);
  console.log(`Bet ${betCount} times`);
  console.log(`Watched ${handsPlayed} rounds`);
  console.log(`EV: ${units / betCount}`);
  console.log(`BetFrequency: ${betCount / handsPlayed}`);
  console.log("\n");

  // console.log(`hitN9BeatsN8:${hitN9BeatsN8}`);
  // console.log(`missedN9BeatsN8:${missedN9BeatsN8}`);
  // console.log(`hands:${handsPlayed}`);
  // console.log(`grandMonkeyProbability: ${hitN9BeatsN8 / handsPlayed}`);
  // console.log(`EV:${50 * (hitN9BeatsN8 / handsPlayed) - (missedN9BeatsN8 / handsPlayed)}`);
  // console.log("\n");
}

// baccaratSimulation(undefined);

// for (let value of ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10"]){
//   baccaratSimulation(value);
// }

//Natural 9 beats 7
//EV: -0.08165706096506709

//After removing 1,2,3,4,5,6,8,10: -0.0684795364542532 EOR: 0.012
//After removing 8,9: -0.17267210147960188 EOR: -0.089

//(1,1,1,2,1,1,1,-6,-6,1,1,1,1)

// for(let i = 4; i < 10; i++) {
//   baccaratSimulation(i);
// }
baccaratSimulation(20000000, 50, 34, 52, 6.5)


// 8,9:-5.5 others: +1
// unitsWon: 10413942
// Bet 110117673 times
// Watched 795802806 rounds
// EV: 0.0945710322084267
// BetFrequency: 0.13837306449507544