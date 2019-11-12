import setUpBankroll from "../setUpBankroll.js";
import BlackjackGameView from "./blackjackGameView";

window.onload = () => {
  setUpBankroll();
  let blackjackGameView = new BlackjackGameView();
  blackjackGameView.startGame();
};