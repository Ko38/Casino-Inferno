# Casino Inferno README

[Casino Inferno](https://ko38.github.io/Casino-Inferno/) is a free casino where players can enjoy gaming.

![alt text](demo.jpg "Title")

## Features
* Blackjack - the most popular card game in the world.
* Baccarat (Coming soon) - the most popular card game among high rollers.
* Roulette (Coming soon) - the most common casino game.
## Technologies
* Javascript
* Webpack

Used Vanilla Javascript for all the frontend manipulation.

```javascript
import setUpBankroll from "../setUpBankroll.js";
import BlackjackGameView from "./blackjackGameView";

window.onload = () => {
  setUpBankroll();
  let blackjackGameView = new BlackjackGameView();
  blackjackGameView.startGame();
};
```