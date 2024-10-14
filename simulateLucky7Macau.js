const Deck = require("./js/blackjack/deck");



let rounds = {};
for(let i = 0; i < 100; i++){
  rounds[i] = [];
}
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
    if (card.value === "8" || card.value === "9") {
      return 1;
    } else if (card.value === "7") {
      return -2;
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
      rounds[deck.roundOnBoard].push(deck.decksLeft());
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
    
      let settleLucky7 = (playerCard3, bankerTotalValue, playerTotalValue) => {
        if(playerCard3 && playerTotalValue === 7 && playerTotalValue > bankerTotalValue){
          return 15;
        } else if (playerTotalValue === 7 && playerTotalValue > bankerTotalValue){
          return 6;
        }
        return -1;
      };

      

      let playerTotal = getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue());
      let bankerTotal = getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue());

      if (playerTotal >= 8 || bankerTotal >= 8) {
        settleBaccarat(playerTotal, bankerTotal);
        let payout = settleLucky7(undefined, bankerTotal, playerTotal);
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
      let payout = settleLucky7(playerCard3, bankerTotal, playerTotal);
      if(triggerTrueCount && triggered){
        units += payout;
        betCount++;
      }
      deck.roundOnBoard++;
    }

    // if(new Date() - currentTime > 60000) {
    //   console.log(`After ${i+1} Shoes`)
    //   console.log("-----Lucky 7----------");
    //   console.log(`triggerTrueCount:${triggerTrueCount}`);
    //   console.log(`cutCard: ${cutCardMin} ~ ${cutCardMax}`);
    //   console.log(`unitsWon:${units}`);
    //   console.log(`unitsWon/Shoe:${units/(i+1)}`);
    //   console.log(`Bet ${betCount} times`);
    //   console.log(`Watched ${handsPlayed} rounds`);
    //   console.log(`EV: ${units / betCount}`);
    //   console.log(`BetFrequency: ${betCount / handsPlayed}`);
    //   console.log("\n");


    //   currentTime = new Date();
    // }

  }

  console.log("-----Lucky 7----------");
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

 baccaratSimulation( 2000000, 14, 26, 8);
 baccaratSimulation( 2000000, 14, 26, 10);
 baccaratSimulation( 2000000, 14, 26, 12);


//EV: -0.1828827683496032
//A Removed: -0.1793996711551355    -> 0
//2 Removed: -0.19405157036620582   -> -0.01
//3 Removed: -0.1921222784147178    -> -0.01
//4 Removed: -0.19346372848037438   -> -0.01
//5 Removed: -0.18942238613451565   -> 0
//6 Removed: -0.1835014364111436    -> 0
//7 Removed: -0.22037706516452918   -> -0.04
//8 Removed: -0.15580997872483487   -> 0.02
//9 Removed: -0.1605724164663534    -> 0.02
//10 Removed: -0.17976995743787297  -> 0

