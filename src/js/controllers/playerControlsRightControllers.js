import betAreaChipsView from "../views/betArea/betAreaChipsView";
import totalBetView from "../views/totalBet/totalBetView";
import totalScoreView from "../views/totalScore/totalScoreView";
import playerCardView from "../views/cards/playerCardView";
import dealerCardView from "../views/cards/dealerCardView";
import playerControlsRightView from "../views/playerControls/playerControlsRightView";
import alertView from "../views/alert/alertView";
import playerCardsScoreView from "../views/cardsScore/playerCardsScoreView";
import playerControlsRightBtnsView from "../views/buttons/playerControlsRightBtnsView";
import playerControlsLeftBtnsView from "../views/buttons/playerControlsLeftBtnsView";
import { generateRandCard, wait, sumArrVals, updateCardsTotalScore } from "../helpers/helpers";
import { playerState } from "../models/playerState";
import { dealerState } from "../models/dealerState";
import { cardDeck } from "../models/cardDeck";
import { GENERATE_CARD_DELAY } from "../config/animationConfig";
import { INITIAL_GENERATE_CARD_COUNT, TOTAL_CARDS_NUM } from "../config/cardConfig";

export const controlPlayerControlsRightInitialBtns = async () => {
   const initialBtns = [
      {
         type: "bet",
         variant: "primary",
      },
      {
         type: "reset",
         variant: "danger",
      },
   ];

   //  await playerControlsRightView.render(initialBtns);
   await playerControlsRightBtnsView.addBtn(initialBtns);
};

export const controlResetBets = async () => {
   // // Only allow player to reset bets if they has already placed a bet
   if (playerState.totalBets === 0) {
      alertView.showAlert("Please place your bet!");
      return;
   }
   // Clear the bets in UI with animation
   await betAreaChipsView.clearBetAreaChips();

   // Reset player bet history, total bets and total score
   playerState.betChipListHistory = [];
   playerState.totalScore += playerState.totalBets;
   playerState.totalBets = 0;

   // Reset total bet display on UI to 0
   totalBetView.updateTotalBetsVal(0);

   // Reset total score display on UI to initial score
   totalScoreView.updateTotalScore(playerState.totalScore);
};

const createAndSaveCard = (cardDeckHistory, playerType, playerTypeCardHistory) => {
   // Create card
   let { type, card } = generateRandCard(playerType);
   if (cardDeckHistory.length > 0) {
      // Check if the card is already in the card deck history. Change another if true
      while (cardDeckHistory.some((generatedCard) => generatedCard.id === card.id)) {
         if (cardDeckHistory.length === TOTAL_CARDS_NUM) {
            alertView.showAlert("Card Deck Limit Reached!");
            return;
         } else {
            type = generateRandCard(playerType).type;
            card = generateRandCard(playerType).card;
         }
      }
   }

   // Save card
   playerTypeCardHistory.push(card);
   cardDeckHistory.push(card);

   return { type, card };
};

const controlBetPlacedBtnsAnimation = async () => {
   // Hide Initial Play Controls Right Buttons
   await playerControlsRightBtnsView.removeBtns(["bet", "reset"]);

   // Add Play Controls Right Play Buttons
   const playerControlsRightPlayBtns = [
      {
         type: "hit",
         variant: "primary",
      },
      {
         type: "stand",
         variant: "danger",
      },
   ];

   await playerControlsRightBtnsView.addBtn(playerControlsRightPlayBtns);

   // Add Play Controls Left Play Buttons
   const playerControlsLeftPlayBtns = [
      {
         type: "double-down",
         variant: "secondary",
      },
   ];

   await playerControlsLeftBtnsView.addBtn(playerControlsLeftPlayBtns);
};

const updateAndShowPlayerTotalCardsScore = () => {
   // playerState.totalCardsScore = sumArrVals(playerState.cardListHistory.map(({ value }) => value));
   const playerTotalCardsScoreVals = playerState.cardListHistory.map(({ value }) => value);
   playerState.totalCardsScore = updateCardsTotalScore(playerTotalCardsScoreVals);
   playerCardsScoreView.showCardsScore(playerState.totalCardsScore);
   playerCardsScoreView.animateCardsScore();
};

const createAndRenderPlayerCard = () => {
   // Create and save card for player
   const generatedPlayerCard = createAndSaveCard(
      cardDeck.generatedCardsHistory,
      "player",
      playerState.cardListHistory
   );
   if (!generatedPlayerCard) return;

   // Update and show player's total cards score
   updateAndShowPlayerTotalCardsScore();

   const { type: playerType, card: playerCard } = generatedPlayerCard;
   playerCardView.render({ type: playerType, card: playerCard, stale: false });
};

const createAndRenderDealerCard = (option = {}) => {
   // Create and save card for dealer
   const generatedDealerCard = createAndSaveCard(
      cardDeck.generatedCardsHistory,
      "dealer",
      dealerState.cardListHistory
   );
   if (!generatedDealerCard) return;

   const { type: dealerType, card: dealerCard } = generatedDealerCard;
   dealerCardView.render({
      type: dealerType,
      card: dealerCard,
      stale: option?.staleStatus || false,
   });
};

export const controlInitialBet = async () => {
   // Only allow player to bet if they has already placed a bet
   if (playerState.totalBets === 0) {
      alertView.showAlert("Please place your bet!");
      return;
   }

   // Animate the play buttons when the bet is placed
   await controlBetPlacedBtnsAnimation();

   for (let i = 0; i < INITIAL_GENERATE_CARD_COUNT; i++) {
      // Create and save cards for both player and dealer
      // For Player
      createAndRenderPlayerCard();

      // For Dealer
      // Render the second card of the dealer with the back side
      if (i === INITIAL_GENERATE_CARD_COUNT - 1) {
         createAndRenderDealerCard({ staleStatus: true });
      } else {
         createAndRenderDealerCard();
      }
      // Delay after rendering each card for both player and dealer
      await wait(GENERATE_CARD_DELAY);
   }
};

export const controlHitNewCard = async () => {};
// For Future Use
// To flip back the second card of the dealer
// function flip() {
//   // card[0] means .card__side--front
//   card[0].classList.remove('card__side--front--stale');
//   card[0].style.animation = '.3s ease-in forwards cardFront--toBack';
//   // card[0] means .card__side--back
//   card[1].classList.remove('card__side--back--stale');
//   card[1].style.animation = '.3s ease-in forwards cardBack--toFront';
// }
