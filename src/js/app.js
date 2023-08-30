// const btnBet = document.querySelector(".btn--bet");
// const btnStand = document.querySelector(".btn--stand");
// const btnSplit = document.querySelector(".btn--split");
// const btnDoubleDown = document.querySelector(".btn--double-down");
// const cardFront = document.querySelector(".card__side--player--front");
// const cardBack = document.querySelector(".card__side--player--back");
// const cardDeckPlayer = document.querySelector(".card__deck--player");
// const cardScorePlayer = document.querySelector(".cards__score--player");
// const cardScoreDealer = document.querySelector(".cards__score--dealer");
// const gameRulesIcon = document.querySelector(".header__icon--game-rules");
// const modalGameRules = document.querySelector(".modal--game-rules");
// const modalGameRulesContainer = document.querySelector(".modal--game-rules").parentElement;
// const modalCloseIcon = document.querySelector(".modal__close-icon--game-rules");

// const flipCardToBack = () => {
//   cardFront.style.animation = "cardFront--toBack 0.4s ease-in forwards";
//   cardBack.style.animation = "cardBack--toFront 0.4s ease-in forwards";
// };

// const flipCardToFront = () => {
//   cardFront.style.animation = "cardFront--toFront 0.4s ease-in forwards";
//   cardBack.style.animation = "cardBack--toBack 0.4s ease-in forwards";
// };

// btnBet.addEventListener("click", () => {
//   flipCardToBack();
// });

// btnStand.addEventListener("click", () => {
//   flipCardToFront();
// });

// btnSplit.addEventListener("click", () => {
//   cardDeckPlayer.style.animation = "disappearToRight .3s ease-in forwards";
// });

// btnDoubleDown.addEventListener("click", () => {
//   cardScorePlayer.style.animation = "scaleCardScoreBox .3s ease-in forwards";
//   setTimeout(() => {
//     cardScorePlayer.style.animation = "";
//   }, 400);
// });

// gameRulesIcon.addEventListener("click", () => {
//   modalGameRulesContainer.classList.remove("hidden");
// });

// modalCloseIcon.addEventListener("click", () => {
//   modalGameRules.style.animation = "disappearToBelow 0.3s ease-in forwards";
//   setTimeout(() => {
//     modalGameRulesContainer.classList.add("hidden");
//     modalGameRules.style.animation = "appearFromBelow 0.3s ease-in forwards";
//   }, 400);
// });

import gameRulesModalView from "./views/modal/gameRulesModalView";
