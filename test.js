const Deck = require("./js/blackjack/deck");
// 1 3 7 50 100 500
//one eyed - spades hearts
function jackMagicSimulation(jackTag = -5, oneEyedJackTag = -14, triggerCount = 2) {
  
  let oneJack = 0;
  let oneOneEyedJack = 0;
  let twoJacks = 0;
  let twoOneEyedJacks = 0;
  let threeJacks = 0;
  let threeOneEyedJacks = 0;
  let handsPlayed = 0;
  let lostHands = 0;

  let record = (card1, card2, card3) => {
    handsPlayed++;
    if (card1.isOneEyedJack() && card2.isOneEyedJack() && card3.isOneEyedJack()) {
      threeOneEyedJacks++;
      return 500;
    } else if (card1.isJack() && card2.isJack() && card3.isJack()) {
      threeJacks++;
      return 100;
    } else if ((card1.isOneEyedJack() && card2.isOneEyedJack()) || 
      (card1.isOneEyedJack() && card3.isOneEyedJack()) || 
      (card2.isOneEyedJack() && card3.isOneEyedJack()) ) {
      twoOneEyedJacks++;
      return 50;
    } else if ((card1.isJack() && card2.isJack()) ||
      (card1.isJack() && card3.isJack()) ||
      (card2.isJack() && card3.isJack()))  {
      twoJacks++;
      return 7;
    } else if (card1.isOneEyedJack() || card2.isOneEyedJack() || card3.isOneEyedJack()) {
      oneOneEyedJack++;
      return 3;
    } else if (card1.isJack() || card2.isJack() || card3.isJack()) {
      oneJack++;
      return 1;
    } else {
      lostHands++;
      return -1;
    }
  }

  let counting = (card) => {
    if(card.isOneEyedJack()){
      return oneEyedJackTag;
    }
    if (card.isJack()) {
      return jackTag;
    }
    return 1;
  }

  let units = 0;
  let betCount = 0;
  for(let i = 0; i < 1000000; i++ ){
    let deck = new Deck(6);
    let count = 0;
    while (!deck.isCutCardOut(104)) {
      let triggered = (count / deck.decksLeft()) >= triggerCount;
      let card1 = deck.deal();
      let card2 = deck.deal();
      let card3 = deck.deal();
      count += counting(card1);
      count += counting(card2);
      count += counting(card3);
      let payout = record(card1, card2, card3);
      if(triggered) {
        betCount++;
        units += payout;
      }
    }
  }
  console.log(`unitsWon:${units}`);
  console.log(`Bet ${betCount} times`);
  console.log(`Watched ${handsPlayed} rounds`);   
  console.log(`EV: ${units/betCount}`);
  console.log(`BetFrequency: ${betCount/handsPlayed}`);
  // console.log(oneJack);
  // console.log( oneOneEyedJack );
  // console.log( twoJacks );
  // console.log( twoOneEyedJacks );
  // console.log( threeJacks );
  // console.log( threeOneEyedJacks );
  // console.log(lostHands);
  // console.log(handsPlayed);
  let oneJackProbability = oneJack / handsPlayed;
  let oneOneEyedJackProbability = oneOneEyedJack/ handsPlayed;
  let twoJacksProbability = twoJacks/ handsPlayed;
  let twoOneEyedJacksProbability = twoOneEyedJacks/ handsPlayed;
  let threeJacksProbability = threeJacks/ handsPlayed;
  let threeOneEyedJacksProbability = threeOneEyedJacks/ handsPlayed;
  let lossProbability = lostHands / handsPlayed;
  // console.log(oneJackProbability);
  // console.log(oneOneEyedJackProbability);
  // console.log(twoJacksProbability);
  // console.log(twoOneEyedJacksProbability);
  // console.log(threeJacksProbability);
  // console.log(threeOneEyedJacksProbability);
  // console.log(lossProbability);

  // 1 3 7 50 100 500
  let EV = oneJackProbability * 1 + oneOneEyedJackProbability * 3
    + twoJacksProbability * 7 + twoOneEyedJacksProbability * 50
    + threeJacksProbability * 100 + threeOneEyedJacksProbability * 500
    - lossProbability;

  // console.log(EV);

  //EV: -0.05807970114942529
  //Removed six non-Jack cards: -0.029013282352941094
  //Removed twelve nonJack: 0.0008550963855422644
  //Removed six jacks: -0.2098836352941178
  //Removed twelve jacks: -0.3121883614457831
  //Removed six one-eyed Jacks: -0.4703449411764705
  //Remvoed twelve one-eyed Jacks: -0.7383398072289156

  //HE: 5.8%
  //nonJack: 2.9%
  //Jack: 15.188% and 10.23%
  //One-eyed: 41.2% and 26.8%

  // 1 -5 -14 true2

}



// let jackTags = [-2, -3, -4, -5, -6, -7, -8];
// let oneEyedJackTags = [-8, -9, -10, -11, -12, -13, -14, -15, -16, -17];
// let triggerCounts = [ 2,  3,  4];

// for(let jackTag of jackTags) {
//   for(let oneEyedJackTag of oneEyedJackTags) {
//     for(let triggerCount of triggerCounts) {
//       console.log(`jack:${jackTag} oneEyedJ:${oneEyedJackTag} triggerCount:${triggerCount}:`);
//       jackMagicSimulation(jackTag,oneEyedJackTag,triggerCount);
//     }
//   }
// }

// let tags = [
//   { jackTag: -6, oneEyedJackTag: -17, triggerCount: 3 },
//   { jackTag: -7, oneEyedJackTag: -16, triggerCount: 3 },
//   { jackTag: -7, oneEyedJackTag: -16, triggerCount: 4 },
//   { jackTag: -7, oneEyedJackTag: -17, triggerCount: 2 },
//   { jackTag: -8, oneEyedJackTag: -15, triggerCount: 3 },
//   { jackTag: -8, oneEyedJackTag: -16, triggerCount: 2 },
//   { jackTag: -6, oneEyedJackTag: -17, triggerCount: 2 },
//   { jackTag: -7, oneEyedJackTag: -16, triggerCount: 2 },
//   { jackTag: -8, oneEyedJackTag: -15, triggerCount: 2 },
//   { jackTag: -5, oneEyedJackTag: -17, triggerCount: 4 },
//   { jackTag: -6, oneEyedJackTag: -16, triggerCount: 4 },
//   { jackTag: -7, oneEyedJackTag: -15, triggerCount: 4},
// ];

// for(let tag of tags ) {
//   console.log(`jack:${tag.jackTag} oneEyedJ:${tag.oneEyedJackTag} triggerCount:${tag.triggerCount}:`);
//   jackMagicSimulation(tag.jackTag, tag.oneEyedJackTag, tag.triggerCount);
// }

jackMagicSimulation(-7, -17, 2);

// jack: -7 oneEyedJ: -17 triggerCount: 2:
// unitsWon: 3741122
// Bet 26227801 times
// Watched 70000000 rounds
// EV: 0.14263956021322566
// BetFrequency: 0.37468287142857143