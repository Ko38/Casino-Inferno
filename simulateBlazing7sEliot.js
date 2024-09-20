const Deck = require("./js/blackjack/deck");




let currentTime = new Date();

function baccaratSimulation(numOfShoes = 20000000, const2CardB7Payout = 50, const3CardB7Payout = 200, cutCardMin = 33, cutCardMax = 42, triggerTrueCount = 4) {

  let handsPlayed = 0;
  let threecard7 = 0;
  let twocard7 = 0;
  let missed = 0;

  let bankerWin = 0;
  let playerWin = 0;
  let tie = 0;

  

  let counting = (card) => {
    if(card.value === "A" || card.value === "10" || card.value === "J" || card.value === "Q" || card.value === "K") {
      return 1;
    } else if (card.value === "8" || card.value === "9") {
      return 2;
    } else if (card.value === "4" ||card.value === "3"||card.value === "5") {
      return -1;
    } else if (card.value === "7") {
      return -6;
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
  for(let i = 0; i < numOfShoes; i++ ){
    let deck = new Deck(8);

    let cutCard = Math.floor(Math.random() * (cutCardMax-cutCardMin+1)) + cutCardMin;
    let burnCard = deck.baccaratBurn();
    let count = 0;
    count += counting(burnCard);
    let lastRound = false;

    while (!lastRound) {
      lastRound = deck.isCutCardOut(cutCard);
     // let triggered = count >= triggerTrueCount;
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
            threecard7++;
          return const3CardB7Payout;
        }
        if(!bankerCard3 && !playerCard3 && 
          getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue()) === 7 &&
          getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue()) === 7) {
            twocard7++;
            return const2CardB7Payout;
          }
          missed++;
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
      }
      
    }
    if(new Date() - currentTime > 60000) {
      console.log(`After ${i+1} Shoes`)
      console.log("-----Blazing 7s----------");
      console.log(`triggerTrueCount:${triggerTrueCount}`);
      console.log(`cutCard: ${cutCardMin} ~ ${cutCardMax}`);
      console.log(`const2CardB7Payout:${const2CardB7Payout}`);
      console.log(`const3CardB7Payout:${const3CardB7Payout}`);
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

  console.log("-----Blazing 7s----------");
  console.log(`triggerTrueCount:${triggerTrueCount}`);
  console.log(`cutCard: ${cutCardMin} ~ ${cutCardMax}`);
  console.log(`const2CardB7Payout:${const2CardB7Payout}`);
  console.log(`const3CardB7Payout:${const3CardB7Payout}`);
  console.log(`unitsWon:${units}`);
  console.log(`unitsWon/Shoe:${units/numOfShoes}`);
  console.log(`Bet ${betCount} times`);
  console.log(`Watched ${handsPlayed} rounds`);
  console.log(`EV: ${units / betCount}`);
  console.log(`BetFrequency: ${betCount / handsPlayed}`);
  console.log("\n");

  console.log(`3 card 7s:${threecard7}`)
  console.log(`2 card 7s:${twocard7}`)
  console.log(`missed:${missed}}`)
}

baccaratSimulation(20000000, 50, 200, 34, 52, 4);


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