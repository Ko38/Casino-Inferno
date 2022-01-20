const Deck = require("./js/blackjack/deck");

function baccaratSimulation(cutCard, triggerCount) {
  let handsPlayed = 0;
  let bankerWin = 0;
  let playerWin = 0;
  let tie = 0;

//-0.08641816433689227

// cardRemoved: A
// EV: -0.007434105221359786   0.078984  7%    1
// cardRemoved: 2
// EV: -0.010681006708244874   0.0757    7%    1
// cardRemoved: 3
// EV: -0.4063423786103938     -0.31992  -32%  -4
// cardRemoved: 4
// EV: -0.018662341543121058   0.067756  7%    1
// cardRemoved: 5
// EV: -0.0021131827698807996  0.08430498 8%   1
// cardRemoved: 6
// EV: 0.05592989967970248     0.142347   14%  2
// cardRemoved: 7
// EV: 0.05559573946100004     0.1420139  14%  2
// cardRemoved: 8
// EV: -0.9279618933195892     -0.84154   -84% -10
// cardRemoved: 9
// EV: 0.04352252473648696     0.12994    13%  2
// cardRemoved: J
// EV: -0.0062496998974017415  0.08016846  8%  1


  let counting = (card) => {

    if (card.value === "A" || card.value === "2" || card.value === "4" || card.value === "5" || card.value === "10" || card.value === "J" || card.value === "Q" || card.value === "K") {
      return 1;
    } else if (card.value === "3"){
      return -4;
    } else if (card.value === "6" || card.value === "7" || card.value === "9"){
      return 2;
    } else if (card.value === "8") {
      return -10;
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

  let b38units = 0;
  let b38betCount = 0;
  let triggerCountUnits = 0;
  let triggerCountBetCount = 0;
  
  let tc4Units = 0;
  let tc4BetCount = 0;
  for(let i = 0; i < 10000000; i++ ){
    
    let deck = new Deck(8);
    let count = 0;
    while (!deck.isCutCardOut(cutCard)) {
      let triggered = count / deck.decksLeft() >= triggerCount;
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

      let settle38 = (bankerTotal, bankerCard3, playerCard3) => {
        if(!playerCard3){
          return -1;
        }

        if(bankerCard3) {
          return -1;
        }

        if (bankerTotal === 3 && playerCard3.value === '8'){
          return 200;
        }
        return -1;
      };

      let playerTotal = getBaccaratActualValue(playerCard1.faceValue() + playerCard2.faceValue());
      let bankerTotal = getBaccaratActualValue(bankerCard1.faceValue() + bankerCard2.faceValue());

      //Natural
      if (playerTotal >= 8 || bankerTotal >= 8) {
        settleBaccarat(playerTotal, bankerTotal);
        b38units--;
        b38betCount++;
        if(triggered){
          triggerCountUnits--;
          triggerCountBetCount++;
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
      let b38payout = settle38(bankerTotal,bankerCard3, playerCard3);
      b38units += b38payout;
      b38betCount++;
      if(triggered){
        triggerCountUnits += b38payout;
        triggerCountBetCount++;
      }
    }    
  }

  console.log("----------------");
  console.log(`triggerCount: ${triggerCount}`);
  console.log(`${triggerCountUnits}`);
  console.log(`Watched ${handsPlayed} rounds`);
  console.log(`EV: ${triggerCountUnits / triggerCountBetCount}`);
  console.log(`Bet Frequency: ${triggerCountBetCount / handsPlayed}`);
  console.log("\n");
}

baccaratSimulation(26, 3);
baccaratSimulation(26, 4);
baccaratSimulation(26, 5);
baccaratSimulation(26, 6);


//-0.08641816433689227

// cardRemoved: A
// EV: -0.007434105221359786   0.078984  7%    1
// cardRemoved: 2
// EV: -0.010681006708244874   0.0757    7%    1
// cardRemoved: 3
// EV: -0.4063423786103938     -0.31992  -32%  -4
// cardRemoved: 4
// EV: -0.018662341543121058   0.067756  7%    1
// cardRemoved: 5
// EV: -0.0021131827698807996  0.08430498 8%   1
// cardRemoved: 6
// EV: 0.05592989967970248     0.142347   14%  2
// cardRemoved: 7
// EV: 0.05559573946100004     0.1420139  14%  2
// cardRemoved: 8
// EV: -0.9279618933195892     -0.84154   -84% -10
// cardRemoved: 9
// EV: 0.04352252473648696     0.12994    13%  2
// cardRemoved: J
// EV: -0.0062496998974017415  0.08016846  8%  1

// ----------------
// triggerCount: 3
// 31841248
// Watched 795805777 rounds
// EV: 0.12909376876111706
// Bet Frequency: 0.3099400609151396 
// ----------------
// triggerCount: 4
// 32935423
// Watched 795796639 rounds
// EV: 0.1545151923733538
// Bet Frequency: 0.2678489560697931 
// ----------------
// triggerCount: 5
// 33177051
// Watched 795801267 rounds
// EV: 0.179704615400215
// Bet Frequency: 0.23199248814465634 
// ----------------
// triggerCount: 6
// 32693561
// Watched 795796811 rounds
// EV: 0.20316973274960226
// Bet Frequency: 0.20220925213031546
