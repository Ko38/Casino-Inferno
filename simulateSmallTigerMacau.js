const Deck = require("./js/blackjack/deck");
//if 23to1
//Use tags: (0, 0, 1, 1, 1, -6, 4, 2, 1, -1)
//Trigger true count: +12


let currentTime = new Date();

function baccaratSimulation(numOfShoes = 20000000, cutCardMin = 14, cutCardMax = 14, triggerTrueCount) {

  let handsPlayed = 0;
  let threecard7 = 0;
  let twocard7 = 0;
  let missed = 0;

  let bankerWin = 0;
  let playerWin = 0;
  let tie = 0;

  

  let counting = (card) => {
    if (card.value === "3" || card.value === "4" || card.value === "5") {
      return 1;
    } else if (card.value === "6"){
      return -6;
    } else if (card.value === "7") {
      return 4;
    } else if (card.value === "8"){
      return 2;
    } else if (card.value === "9"){
      return 1;
    } else if (card.value === "10" || card.value === "J" || card.value === "Q" || card.value === "K"){
      return -1;
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
    
      let settleSmallTiger = (bankerCard3, bankerTotalValue, playerTotalValue) => {
        if(bankerCard3){
          return -1;
        }
        if(bankerTotalValue === 6 && playerTotalValue < bankerTotalValue){
          return 22;
        } 
        return -1;
      };

      

      let playerTotal = getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue());
      let bankerTotal = getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue());

      if (playerTotal >= 8 || bankerTotal >= 8) {
        settleBaccarat(playerTotal, bankerTotal);
        let payout = settleSmallTiger(undefined, bankerTotal, playerTotal);
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
      let payout = settleSmallTiger(bankerCard3, bankerTotal, playerTotal);
      if(triggerTrueCount && triggered){
        units += payout;
        betCount++;
      }
      deck.roundOnBoard++;
    }

    if(new Date() - currentTime > 60000) {
      console.log(`After ${i+1} Shoes`)
      console.log("-----SmallTiger----------");
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

  console.log("-----SmallTiger----------");
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

for(let i = 14; i < 30; i+=2){
  baccaratSimulation( 2000000, i,i , 16);

}

// After 6540092 Shoes
// -----SmallTiger----------
// triggerTrueCount:15
// cutCard: 42 ~ 42
// unitsWon:480860
// unitsWon/Shoe:0.07352495958772445
// Bet 11680252 times
// Watched 486623328 rounds
// EV: 0.04116863232060404
// BetFrequency: 0.024002655293993633



// After 6272801 Shoes
// -----SmallTiger----------
// triggerTrueCount:16
// cutCard: 42 ~ 42
// unitsWon:486395
// unitsWon/Shoe:0.07754032050434885
// Bet 9376856 times
// Watched 466733257 rounds
// EV: 0.05187186408749372
// BetFrequency: 0.02009039608677382


// After 6381164 Shoes
// -----SmallTiger----------
// triggerTrueCount:15
// cutCard: 42 ~ 42
// unitsWon:484220
// unitsWon/Shoe:0.07588270729290142
// Bet 11380031 times
// Watched 474804321 rounds
// EV: 0.04254997196404825
// BetFrequency: 0.02396783368784885

// After 6125118 Shoes
// -----SmallTiger----------
// triggerTrueCount:15
// cutCard: 42 ~ 42
// unitsWon:432890
// unitsWon/Shoe:0.07067455680037511
// Bet 10923728 times
// Watched 455749997 rounds
// EV: 0.03962841257123942
// BetFrequency: 0.02396868474362272

// After 5615926 Shoes
// -----SmallTiger----------
// triggerTrueCount:16
// cutCard: 42 ~ 42
// unitsWon:425033
// unitsWon/Shoe:0.07568351149926121
// Bet 8412119 times
// Watched 417860248 rounds
// EV: 0.05052627049141839
// BetFrequency: 0.020131417238808513

//4million shoes
// -----SmallTiger----------
// triggerTrueCount:15
// cutCard: 42 ~ 42
// unitsWon:275189
// unitsWon/Shoe:0.06879725
// Bet 7131984 times
// Watched 297623654 rounds
// EV: 0.03858519592865043
// BetFrequency: 0.023963095352629464

// 4million shoes
// -----SmallTiger----------
// triggerTrueCount:16
// cutCard: 42 ~ 42
// unitsWon:300042
// unitsWon/Shoe:0.0750105
// Bet 5989929 times
// Watched 297622948 rounds
// EV: 0.05009107787421187
// BetFrequency: 0.020125897684475594

//20million shoes
// -----SmallTiger----------
// triggerTrueCount:15
// cutCard: 42 ~ 42
// unitsWon:1423747
// unitsWon/Shoe:0.07118735
// Bet 35679531 times
// Watched 1488130181 rounds
// EV: 0.03990374761372284
// BetFrequency: 0.023976081834469563


// 20million Shoes
// -----SmallTiger----------
// triggerTrueCount:16
// cutCard: 42 ~ 42
// unitsWon:1512942
// unitsWon/Shoe:0.0756471
// Bet 29916696 times
// Watched 1488132816 rounds
// EV: 0.050571827851578266
// BetFrequency: 0.02010351205103725

//200million
// -----SmallTiger----------
// triggerTrueCount:16
// cutCard: 42 ~ 42
// unitsWon:14909725
// unitsWon/Shoe:0.074548625
// Bet 299047152 times
// Watched 14881285667 rounds
// EV: 0.049857438535311646
// BetFrequency: 0.020095518538640254