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
    if(card.value === "A" || card.value === "6"){
      return -1;
    } else if (card.value === "7" || card.value === "8") {
      return -2;
    } else if (card.value === "2" || card.value === "3" || card.value === "10"
          || card.value === "J" || card.value === "Q" || card.value === "K") {
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

  let units = 0;
  let betCount = 0;
  for(let i = 0; i < 10000000; i++ ){
    let deck = new Deck(8);
    if (cardValueRemoved){
      deck.removeNCards(cardValueRemoved, 8);
    }
    
    let count = 0;
    while (!deck.isCutCardOut(26)) {
      //let triggered = (count / deck.decksLeft()) >= triggerCount;

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
      }

      settleBaccarat(playerTotal, bankerTotal);
      settleGrandMonkey(playerCard1, playerCard2, bankerCard1, bankerCard2, playerCard3, bankerCard3);
      
    }
  }
  console.log(`After removing ${cardValueRemoved}`);
  console.log(`hitGrandMonkey:${hitGrandMonkey}`);
  console.log(`missedGrandMonkey:${missedGrandMonkey}`);
  console.log(`hands:${handsPlayed}`);
  console.log(`grandMonkeyProbability: ${hitGrandMonkey / handsPlayed}`);
  console.log(`EV:${5000 * (hitGrandMonkey / handsPlayed) - (missedGrandMonkey / handsPlayed)}`);
  console.log("\n");
}

baccaratSimulation(undefined);

for (let value of ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10"]){
  baccaratSimulation(value);
}