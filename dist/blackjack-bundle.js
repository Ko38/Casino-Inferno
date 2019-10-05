/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/blackjack/blackjack-entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/blackjack/blackjack-entry.js":
/*!*****************************************!*\
  !*** ./js/blackjack/blackjack-entry.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setUpBankroll_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../setUpBankroll.js */ "./js/setUpBankroll.js");
/* harmony import */ var _blackjackGameView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blackjackGameView */ "./js/blackjack/blackjackGameView.js");



window.onload = function () {
  Object(_setUpBankroll_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var blackjackGameView = new _blackjackGameView__WEBPACK_IMPORTED_MODULE_1__["default"]();
  blackjackGameView.startGame();
};

/***/ }),

/***/ "./js/blackjack/blackjackGame.js":
/*!***************************************!*\
  !*** ./js/blackjack/blackjackGame.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deck */ "./js/blackjack/deck.js");
/* harmony import */ var _deck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hand */ "./js/blackjack/hand.js");
/* harmony import */ var _dealerHand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dealerHand */ "./js/blackjack/dealerHand.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var BlackjackGame =
/*#__PURE__*/
function () {
  function BlackjackGame(render) {
    _classCallCheck(this, BlackjackGame);

    this.betAmounts = [0, 0, 0];
    this.playerHands = [null, null, null];
    this.deck = new _deck__WEBPACK_IMPORTED_MODULE_0___default.a(2);
    this.dealerHand = null;
    this.render = render;
    this.dealerHitting = false;
    this.currentPlayerIndex = 0;
  }

  _createClass(BlackjackGame, [{
    key: "clearBets",
    value: function clearBets() {
      for (var i = 0; i < this.betAmounts.length; i++) {
        this.betAmounts[i] = 0;
      }
    }
  }, {
    key: "placeBet",
    value: function placeBet(seatNo, betAmount) {
      this.betAmounts[seatNo] += betAmount;
    }
  }, {
    key: "getCurrentBetAmount",
    value: function getCurrentBetAmount(seatNo) {
      return this.betAmounts[seatNo];
    }
  }, {
    key: "deal",
    value: function deal() {
      var _this = this;

      this.currentPlayerIndex = -1;

      for (var i = 0; i < this.betAmounts.length; i++) {
        if (this.betAmounts[i] > 0) {
          if (this.currentPlayerIndex === -1) {
            this.currentPlayerIndex = i;
          }

          this.playerHands[i] = new _hand__WEBPACK_IMPORTED_MODULE_1__["default"]();
        }
      }

      if (this.playerHands.filter(function (playerHand) {
        return !!playerHand;
      }).length === 0) {
        return false;
      }

      this.dealerHand = new _dealerHand__WEBPACK_IMPORTED_MODULE_2__["default"]();

      while (this.dealerHand.numOfCards() < 2) {
        this.dealerHand.receiveCard(this.deck.deal());
        this.playerHands.forEach(function (playerHand) {
          if (playerHand) {
            playerHand.receiveCard(_this.deck.deal());

            _this.render();
          }
        });
      }

      return true;
    }
  }, {
    key: "hit",
    value: function hit() {
      this.playerHands[this.currentPlayerIndex].receiveCard(this.deck.deal());
      this.render();
    }
  }, {
    key: "stand",
    value: function stand() {}
  }, {
    key: "double",
    value: function double() {}
  }, {
    key: "split",
    value: function split() {}
  }]);

  return BlackjackGame;
}();

/* harmony default export */ __webpack_exports__["default"] = (BlackjackGame);

/***/ }),

/***/ "./js/blackjack/blackjackGameView.js":
/*!*******************************************!*\
  !*** ./js/blackjack/blackjackGameView.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blackjackGame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blackjackGame.js */ "./js/blackjack/blackjackGame.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var BlackjackGameView =
/*#__PURE__*/
function () {
  function BlackjackGameView() {
    _classCallCheck(this, BlackjackGameView);

    this.game = new _blackjackGame_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.render.bind(this));
    this.seats = [document.getElementById("seat0"), document.getElementById("seat1"), document.getElementById("seat2")];
    this.selectedChipAmount = 1;
    this.setUpSelectChipEvents();
    this.hideAllCards();
  }

  _createClass(BlackjackGameView, [{
    key: "hideAllCards",
    value: function hideAllCards() {
      for (var seatNo = 0; seatNo < 3; seatNo++) {
        for (var i = 0; i < 8; i++) {
          document.getElementById("card".concat(seatNo).concat(i)).style.visibility = "hidden";
        }
      }
    }
  }, {
    key: "setUpPlayerDecisionButtons",
    value: function setUpPlayerDecisionButtons() {
      var _this = this;

      document.getElementById("left-buttons").innerHTML = "<button class=\"nav-bar-button\" id=\"hit-button\">HIT</button>\n        <button class=\"nav-bar-button\" id=\"double-button\">DOUBLE</button>";
      document.getElementById("right-buttons").innerHTML = "<button class=\"nav-bar-button\" id=\"stand-button\">STAND</button>\n        <button class=\"nav-bar-button\" id=\"split-button\">SPLIT</button>";

      document.getElementById("hit-button").onclick = function () {
        _this.game.hit();
      };

      document.getElementById("stand-button").onclick = function () {
        _this.game.stand();
      };

      document.getElementById("double-button").onclick = function () {
        _this.game["double"]();
      };

      document.getElementById("split-button").onclick = function () {
        _this.game.split();
      };
    }
  }, {
    key: "startGame",
    value: function startGame() {
      var _this2 = this;

      this.setUpPlaceBetEvents();
      this.setUpClearEvents();

      document.getElementById("deal-button").onclick = function () {
        if (_this2.game.deal()) {
          _this2.setUpPlayerDecisionButtons();
        }
      };
    }
  }, {
    key: "setUpSelectChipEvents",
    value: function setUpSelectChipEvents() {
      var _this3 = this;

      var oneDollarChip = document.getElementById("oneDollarChip");
      var fiveDollarChip = document.getElementById("fiveDollarChip");
      var tenDollarChip = document.getElementById("tenDollarChip");
      var twentyFiveDollarChip = document.getElementById("twentyFiveDollarChip");
      var chipElements = [oneDollarChip, fiveDollarChip, tenDollarChip, twentyFiveDollarChip];

      var _loop = function _loop() {
        var chipSelected = _chipElements[_i];

        chipSelected.onclick = function () {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = chipElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var chip = _step.value;

              if (chip === chipSelected) {
                chip.classList.add("selected");
                _this3.selectedChipAmount = parseInt(chip.getAttribute("value")) || 1;
              } else {
                chip.classList.remove("selected");
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        };
      };

      for (var _i = 0, _chipElements = chipElements; _i < _chipElements.length; _i++) {
        _loop();
      }
    }
  }, {
    key: "setUpPlaceBetEvents",
    value: function setUpPlaceBetEvents() {
      var _this4 = this;

      var _loop2 = function _loop2(i) {
        _this4.seats[i].onclick = function () {
          _this4.game.placeBet(i, _this4.selectedChipAmount);

          _this4.seats[i].innerHTML = "<img src='./assets/empty_chip_25.png'></img>";
          _this4.seats[i].innerHTML += "<div class='centered-betAmount'>" + _this4.game.getCurrentBetAmount(i) + "</div>";
        };
      };

      for (var i = 0; i < this.seats.length; i++) {
        _loop2(i);
      }
    }
  }, {
    key: "setUpClearEvents",
    value: function setUpClearEvents() {
      var _this5 = this;

      document.getElementById("clear-button").onclick = function () {
        _this5.game.clearBets();

        for (var i = 0; i < _this5.seats.length; i++) {
          _this5.seats[i].innerHTML = "";
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      for (var seatNo = 0; seatNo < this.game.playerHands.length; seatNo++) {
        if (!this.game.playerHands[seatNo]) {
          continue;
        }

        for (var cardNo = 0; cardNo < this.game.playerHands[seatNo].cards.length; cardNo++) {
          var card = this.game.playerHands[seatNo].cards[cardNo];

          if (card) {
            document.getElementById("card".concat(seatNo).concat(cardNo)).style.visibility = "visible";
            document.getElementById("value".concat(seatNo).concat(cardNo)).innerHTML = card.value;
            document.getElementById("suit".concat(seatNo).concat(cardNo)).className = card.suit;
          }
        }
      }

      document.getElementById("dealerCards").innerHTML = "";

      for (var _cardNo = 0; _cardNo < this.game.dealerHand.cards.length; _cardNo++) {
        var _card = this.game.dealerHand.cards[_cardNo];

        if (_card) {
          if (_cardNo === 1 && !this.game.dealerHitting) {
            document.getElementById("dealerCards").innerHTML += "<img style=\"border-radius:10px\" src=\"assets/card_back.jpg\"/>";
          } else {
            document.getElementById("dealerCards").innerHTML += "<div class=\"dealerCard".concat(_cardNo, " card\">\n            <div class=\"value\" id = \"dealerCard").concat(_cardNo, "\" > ").concat(_card.value, "</div >\n            <div class=\"").concat(_card.suit, "\" id=\"dealerCard").concat(_cardNo, "\"></div>\n          </div >");
          }
        }
      }
    }
  }]);

  return BlackjackGameView;
}();

/* harmony default export */ __webpack_exports__["default"] = (BlackjackGameView);

/***/ }),

/***/ "./js/blackjack/card.js":
/*!******************************!*\
  !*** ./js/blackjack/card.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SUITS = ["spades", "diamonds", "hearts", "clubs"];
var VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

var Card =
/*#__PURE__*/
function () {
  function Card(suit, value) {
    _classCallCheck(this, Card);

    this.suit = suit;
    this.value = value;
  }

  _createClass(Card, [{
    key: "isJack",
    value: function isJack() {
      return this.value === "J";
    }
  }, {
    key: "isOneEyed",
    value: function isOneEyed() {
      return this.suit === "hearts" || this.suit === "spades";
    }
  }, {
    key: "isOneEyedJack",
    value: function isOneEyedJack() {
      return this.isJack() && this.isOneEyed();
    }
  }], [{
    key: "allCards",
    value: function allCards() {
      var numOfDecks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var cards = [];

      for (var i = 0; i < numOfDecks; i++) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = SUITS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var suit = _step.value;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = VALUES[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var value = _step2.value;
                cards.push(new Card(suit, value));
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return cards;
    }
  }]);

  return Card;
}();

module.exports = Card; // export default Card;

/***/ }),

/***/ "./js/blackjack/dealerHand.js":
/*!************************************!*\
  !*** ./js/blackjack/dealerHand.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ "./js/blackjack/card.js");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_card__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hand */ "./js/blackjack/hand.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var DealerHand =
/*#__PURE__*/
function (_Hand) {
  _inherits(DealerHand, _Hand);

  function DealerHand() {
    _classCallCheck(this, DealerHand);

    return _possibleConstructorReturn(this, _getPrototypeOf(DealerHand).call(this));
  }

  return DealerHand;
}(_hand__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (DealerHand);

/***/ }),

/***/ "./js/blackjack/deck.js":
/*!******************************!*\
  !*** ./js/blackjack/deck.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import Card from "./card";
var Card = __webpack_require__(/*! ./card */ "./js/blackjack/card.js");

var Deck =
/*#__PURE__*/
function () {
  function Deck(numOfDecks) {
    _classCallCheck(this, Deck);

    this.numOfDecks = numOfDecks;
    this.shuffle();
  }

  _createClass(Deck, [{
    key: "shuffle",
    value: function shuffle() {
      this.cards = Card.allCards(this.numOfDecks);

      for (var i = this.cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
      }
    }
  }, {
    key: "removeOneCard",
    value: function removeOneCard(value) {
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].value === value) {
          this.cards.splice(i, 1);
          break;
        }
      }
    }
  }, {
    key: "removeOneCardNotOneEyed",
    value: function removeOneCardNotOneEyed(value) {
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].value === value && (this.cards[i].suit === "clubs" || this.cards[i].suit === "diamonds")) {
          this.cards.splice(i, 1);
          break;
        }
      }
    }
  }, {
    key: "removeOneCardOneEyed",
    value: function removeOneCardOneEyed(value) {
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].value === value && (this.cards[i].suit === "spades" || this.cards[i].suit === "hearts")) {
          this.cards.splice(i, 1);
          break;
        }
      }
    }
  }, {
    key: "removeAllCardsWith",
    value: function removeAllCardsWith(value) {
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].value === value) {
          this.cards.splice(i, 1);
        }
      }
    }
  }, {
    key: "print",
    value: function print() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var card = _step.value;
          console.log(card.suit, card.value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "deal",
    value: function deal() {
      return this.cards.shift();
    }
  }, {
    key: "isCutCardOut",
    value: function isCutCardOut() {
      var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 26;
      return this.cards.length < num;
    }
  }, {
    key: "cardsLeft",
    value: function cardsLeft() {
      return this.cards.length;
    }
  }, {
    key: "decksLeft",
    value: function decksLeft() {
      return this.cardsLeft() / 52;
    }
  }]);

  return Deck;
}();

module.exports = Deck; // export default Deck;

/***/ }),

/***/ "./js/blackjack/hand.js":
/*!******************************!*\
  !*** ./js/blackjack/hand.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ "./js/blackjack/card.js");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_card__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Hand =
/*#__PURE__*/
function () {
  function Hand() {
    _classCallCheck(this, Hand);

    this.cards = [];
  }

  _createClass(Hand, [{
    key: "receiveCard",
    value: function receiveCard(card) {
      this.cards.push(card);
    }
  }, {
    key: "numOfCards",
    value: function numOfCards() {
      return this.cards.length;
    }
  }, {
    key: "cardValue",
    value: function cardValue() {
      var hasAce = this.cards.filter(function (card) {
        return card.value === "A";
      }).length > 0;
      var totalValue = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var card = _step.value;
          var value = card.value;

          if (value === "A") {
            totalValue++;
          } else if (value === "J" && value === "Q" && value === "K") {
            totalValue += 10;
          } else {
            totalValue += parseInt(value);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (totalValue <= 11 && hasAce) {
        totalValue += 10;
      }

      return totalValue;
    }
  }, {
    key: "isBusted",
    value: function isBusted() {
      return this.cardValue() > 21;
    }
  }]);

  return Hand;
}();

/* harmony default export */ __webpack_exports__["default"] = (Hand);

/***/ }),

/***/ "./js/setUpBankroll.js":
/*!*****************************!*\
  !*** ./js/setUpBankroll.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var setUpBankroll = function setUpBankroll() {
  var bankroll = localStorage.getItem('bankroll');

  if (!bankroll) {
    bankroll = "100.00";
    localStorage.setItem('bankroll', bankroll);
  }

  document.getElementById("bankroll").innerHTML = "BANKROLL: $".concat(bankroll);
};

/* harmony default export */ __webpack_exports__["default"] = (setUpBankroll);

/***/ })

/******/ });
//# sourceMappingURL=blackjack-bundle.js.map