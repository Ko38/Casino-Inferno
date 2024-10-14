const Deck = require("./js/blackjack/deck");



let currentTime = new Date();

function baccaratSimulation(numOfShoes = 20000000, cutCardMin = 33, cutCardMax = 42, triggerTrueCount) {

  let handsPlayed = 0;
  let threecard7 = 0;
  let twocard7 = 0;
  let missed = 0;

  let bankerWin = 0;
  let playerWin = 0;
  let tie = 0;

  

  let counting = (card) => {
    if (card.value === "2" || card.value === "4") {
      return -3;
    } else if (card.value === "5") {
      return -2;
    }else if (card.value === "6") {
      return -12;
    }else if (card.value === "7") {
      return -8;
    }else if (card.value === "8" || card.value ==="9") {
      return 8;
    }else if (card.value === "10" || card.value === "J" || card.value === "Q" || card.value === "K") {
      return 3;
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
    deck.deal();
    while (!deck.isCutCardOut(cutCard)) {
      //lastRound = deck.isCutCardOut(cutCard);
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
    
      let settleSuperLucky7 = (bankerCard3, playerCard3, bankerTotalValue, playerTotalValue) => {
        let numOfCards = 4;
        if(bankerCard3){
          numOfCards++;
        } 
        if(playerCard3){
          numOfCards++;
        }
        if(numOfCards === 4 && playerTotalValue === 7 && bankerTotalValue === 6){
          return 30;
        } else if(numOfCards === 5 && playerTotalValue === 7 && bankerTotalValue === 6){
          return 40;
        } else if(numOfCards === 6 && playerTotalValue === 7 && bankerTotalValue === 6){
          return 100;
        }
        return -1;
      };

      

      let playerTotal = getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue());
      let bankerTotal = getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue());

      if (playerTotal >= 8 || bankerTotal >= 8) {
        settleBaccarat(playerTotal, bankerTotal);
        let payout = settleSuperLucky7(undefined, undefined, bankerTotal, playerTotal);
        if(triggerTrueCount && triggered){
          units += payout;
          betCount++;
        }
        deck.roundOnBoard++;
        
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
      let payout = settleSuperLucky7(bankerCard3, playerCard3, bankerTotal, playerTotal);
      if(triggerTrueCount && triggered){
        units += payout;
        betCount++;
      }
      deck.roundOnBoard++;
    }

    if(new Date() - currentTime > 60000) {
      console.log(`After ${i+1} Shoes`)
      console.log("-----Super Lucky 7----------");
      console.log(`triggerTrueCount:${triggerTrueCount}`);
      console.log(`cutCard: ${cutCardMin} ~ ${cutCardMax}`);
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

  console.log("-----Super Lucky 7----------");
  console.log(`triggerTrueCount:${triggerTrueCount}`);
  console.log(`cutCard: ${cutCardMin} ~ ${cutCardMax}`);
  console.log(`unitsWon:${units}`);
  console.log(`unitsWon/Shoe:${units/numOfShoes}`);
  console.log(`Bet ${betCount} times`);
  console.log(`Watched ${handsPlayed} rounds`);
  console.log(`EV: ${units / betCount}`);
  console.log(`BetFrequency: ${betCount / handsPlayed}`);
  console.log("\n");
}

baccaratSimulation( 200000000, 42, 42, 33);


//EV: -0.14747989382726176
//A: -0.14313404477934097 -> 0.004         
//2: -0.16186509090213513 -> -0.015 -1.5   -> -3
//3:  -0.14781446219851474 -> 0
//4: -0.16247313960092438 -> -0.015 -1.5   -> -3
//5: -0.15896507259129158 -> -0.01  -1     -> -2
//6: -0.20205748509228838 -> -0.055 -6     -> -12
//7: -0.19000169432664782 -> -0.04  -4     -> -8
//8: -0.11029320838125953 -> 0.037  +4     -> 8
//9: -0.1189957048982589 -> 0.037   +4     -> 8
//10: -0.13229880174799774 -> 0.015 +1.5   -> 3
//J: -0.13229880174799774 -> 0.015 +1.5    -> 3
//Q: -0.13229880174799774 -> 0.015 +1.5    -> 3
//K: -0.13229880174799774 -> 0.015 +1.5    -> 3


// -----Super Lucky 7----------
// triggerTrueCount:31
// cutCard: 42 ~ 42
// unitsWon:669952
// unitsWon/Shoe:0.10254312936298705
// Bet 18302747 times
// Watched 486125801 rounds
// EV: 0.03660390432102897
// BetFrequency: 0.03765022749738807


//20 million shoes
// -----Super Lucky 7----------
// triggerTrueCount:30
// cutCard: 42 ~ 42
// unitsWon:1896732
// unitsWon/Shoe:0.0948366
// Bet 60379844 times
// Watched 1488131483 rounds
// EV: 0.03141333058097997
// BetFrequency: 0.04057426691778417


// After 17699024 Shoes
// -----Super Lucky 7----------
// triggerTrueCount:31
// cutCard: 42 ~ 42
// unitsWon:1720265
// unitsWon/Shoe:0.0971954724735104
// Bet 49609023 times
// Watched 1316911626 rounds
// EV: 0.03467645391847366
// BetFrequency: 0.03767073053389537

//20million
// -----Super Lucky 7----------
// triggerTrueCount:32
// cutCard: 42 ~ 42
// unitsWon:2048986
// unitsWon/Shoe:0.1024493
// Bet 52123888 times
// Watched 1488132986 rounds
// EV: 0.039309922544534665
// BetFrequency: 0.03502636423650917

//20million
// -----Super Lucky 7----------
// triggerTrueCount:33
// cutCard: 42 ~ 42
// unitsWon:2133569
// unitsWon/Shoe:0.10667845
// Bet 48307343 times
// Watched 1488128374 rounds
// EV: 0.044166556624735086
// BetFrequency: 0.032461811658192334

//20million
// -----Super Lucky 7----------
// triggerTrueCount:34
// cutCard: 42 ~ 42
// unitsWon:2015142
// unitsWon/Shoe:0.1007571
// Bet 44906442 times
// Watched 1488124647 rounds
// EV: 0.04487422984880432
// BetFrequency: 0.030176532651703336

//200million
// -----Super Lucky 7----------
// triggerTrueCount:33
// cutCard: 42 ~ 42
// unitsWon:20880170
// unitsWon/Shoe:0.10440085
// Bet 483201531 times
// Watched 14881263282 rounds
// EV: 0.04321213543505929
// BetFrequency: 0.03247046449238408