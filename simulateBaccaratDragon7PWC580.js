const Deck = require("./js/blackjack/deck");





let currentTime = new Date();

function baccaratSimulation(numOfShoes = 20000000, constDragonPayout = 40, cutCardMin = 33, cutCardMax = 42, triggerCount = 32) {
  
  let handsPlayed = 0;
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

  let dragonUnits = 0;
  let triggerCountUnits = 0;
  let triggerCountBetCount = 0;
  let dragonBetCount = 0;
  for(let i = 0; i < numOfShoes; i++ ){
    
    let deck = new Deck(8);
    let cutCard = Math.floor(Math.random() * (cutCardMax-cutCardMin+1)) + cutCardMin;
    let burnCard = deck.baccaratBurn();
    let count = 0;
    count += counting(burnCard);
    let lastRound = false;
    while (!lastRound) {
      lastRound = deck.isCutCardOut(cutCard);
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
          return constDragonPayout;
        }
        return -1;
      };


      let playerTotal = getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue());
      let bankerTotal = getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue());

      if (playerTotal >= 8 || bankerTotal >= 8) {
        settleBaccarat(playerTotal, bankerTotal);
        let dragonPayout = settleDragon7(undefined, bankerTotal, playerTotal);
        
        if (dragonTriggered) {
          dragonBetCount++;
          dragonUnits += dragonPayout;
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
      
      if (dragonTriggered) {
        dragonBetCount++;
        dragonUnits += dragonPayout;
        if(istriggerCount){
          triggerCountUnits += dragonPayout;
          triggerCountBetCount++;
        }
      }
    }

    if(new Date() - currentTime > 60000) {
      console.log(`After ${i+1} Shoes`)
      console.log("-----Dragon----------");
      console.log(`trigger:${triggerCount}`);
      console.log(`cutCard: ${cutCardMin} ~ ${cutCardMax}`);
      console.log(`constDragonPayout:${constDragonPayout}`);
      console.log(`unitsWon:${dragonUnits}`);
      console.log(`unitsWon/Shoe:${dragonUnits/(i+1)}`);
      console.log(`Bet ${dragonBetCount} times`);
      console.log(`Watched ${handsPlayed} rounds`);
      console.log(`EV: ${dragonUnits / dragonBetCount}`);
      console.log(`BetFrequency: ${dragonBetCount / handsPlayed}`);
      console.log("-----TriggerCount----------");
      console.log(`unitsWon:${triggerCountUnits}`);
      console.log(`Bet ${triggerCountBetCount} times`);
      console.log(`EV: ${triggerCountUnits / triggerCountBetCount}`);
      console.log("\n");
      currentTime = new Date();
    }
    
  }


  console.log("-----Dragon----------");
  console.log(`trigger:${triggerCount}`);
  console.log(`cutCard: ${cutCardMin} ~ ${cutCardMax}`);
  console.log(`constDragonPayout:${constDragonPayout}`);
  console.log(`unitsWon:${dragonUnits}`);
  console.log(`unitsWon/Shoe:${dragonUnits/numOfShoes}`);
  console.log(`Bet ${dragonBetCount} times`);
  console.log(`Watched ${handsPlayed} rounds`);
  console.log(`EV: ${dragonUnits / dragonBetCount}`);
  console.log(`BetFrequency: ${dragonBetCount / handsPlayed}`);
  console.log("-----Count 32----------");
  console.log(`unitsWon:${triggerCountUnits}`);
  console.log(`Bet ${triggerCountBetCount} times`);
  console.log(`EV: ${triggerCountUnits / triggerCountBetCount}`);
  console.log("\n");
  return dragonUnits;
}

baccaratSimulation(200000000, 40, 14, 14, 33);

