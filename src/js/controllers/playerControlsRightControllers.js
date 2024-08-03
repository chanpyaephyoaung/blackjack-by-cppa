import betAreaChipsView from "../views/betArea/betAreaChipsView";
import totalBetView from "../views/totalBet/totalBetView";
import totalScoreView from "../views/totalScore/totalScoreView";
import playerCardView from "../views/cards/playerCardView";
import dealerCardView from "../views/cards/dealerCardView";
import playerControlsRightView from "../views/playerControls/playerControlsRightView";
import alertView from "../views/alert/alertView";
import resultMessageView from "../views/resultMessage/resultMessageView";
import playerCardsScoreView from "../views/cardsScore/playerCardsScoreView";
import dealerCardsScoreView from "../views/cardsScore/dealerCardsScoreView";
import playerControlsRightBtnsView from "../views/buttons/playerControlsRightBtnsView";
import playerControlsLeftBtnsView from "../views/buttons/playerControlsLeftBtnsView";
import { wait } from "../helpers/helpers";
import { generateRandCard, wait, sumArrVals, updateCardsTotalScore } from "../helpers/helpers";
import { playerState } from "../models/playerState";
import { dealerState } from "../models/dealerState";
import { betState } from "../models/chipsState";
import { gameState } from "../models/gameState";
import { cardDeck } from "../models/cardDeck";
import { GENERATE_CARD_DELAY } from "../config/animationConfig";
import { INITIAL_GENERATE_CARD_COUNT, TOTAL_CARDS_NUM } from "../config/cardConfig";
import { CLEAN_UP_BTNS_AFTER_FINAL_RESULT_DELAY } from "../config/animationConfig";
import { TYPE_PLAYER, TYPE_DEALER } from "../config/generalConfig.js";

const addInitialBtns = async () => {
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

   await playerControlsRightBtnsView.addBtn(initialBtns);
};

export const controlPlayerControlsRightInitialBtns = async () => {
   await addInitialBtns();
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

const animateBtnsAfterBetPlaced = async () => {
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

const updateAndShowPlayerTotalCardsScore = (playerTypeState, playerTypeCardsScoreView) => {
   const playerTotalCardsScoreVals = playerTypeState.cardListHistory.map(({ value }) => value);
   playerTypeState.totalCardsScore = updateCardsTotalScore(playerTotalCardsScoreVals);
   playerTypeCardsScoreView.showCardsScore(playerTypeState.totalCardsScore);
   playerTypeCardsScoreView.animateCardsScore();
};

const cleanUpAfterRoundEnd = async () => {
   // Delay before cleaning up after the final result message
   await wait(CLEAN_UP_BTNS_AFTER_FINAL_RESULT_DELAY);

   // Clear the card decks
   // For Player
   await playerCardView.clearCardDeck(TYPE_PLAYER);
   playerCardView.clearCards(TYPE_PLAYER);
   playerCardsScoreView.hideCardsScore();

   // For Dealer
   await dealerCardView.clearCardDeck(TYPE_DEALER);
   dealerCardView.clearCards(TYPE_DEALER);
   dealerCardsScoreView.hideCardsScore();

   // Clear the play buttons and bet area chips
   await Promise.all([
      playerControlsRightBtnsView.removeBtns(["hit", "stand"]),
      playerControlsLeftBtnsView.removeBtns(["double-down"]),
      betAreaChipsView.clearBetAreaChips(),
   ]);

   // Set total bets to 0
   playerState.totalBets = 0;
   totalBetView.updateTotalBetsVal(0);

   // Set total player and dealer card scores to 0
   playerState.totalCardsScore = 0;
   dealerState.totalCardsScore = 0;

   // Reset player bet chip list history
   playerState.betChipListHistory = [];

   // Reset both player and dealer card list history
   playerState.cardListHistory = [];
   dealerState.cardListHistory = [];

   // Reset game states
   gameState.hasEnded = false;
   betState.isBetPlaced = false;

   // Show the initial play controls right buttons
   await addInitialBtns();
};

const createAndRenderPlayerCard = () => {
   // Create and save card for player
   const generatedPlayerCard = createAndSaveCard(
      cardDeck.generatedCardsHistory,
      TYPE_PLAYER,
      playerState.cardListHistory
   );
   if (!generatedPlayerCard) return;

   // Update and show player's total cards score
   updateAndShowPlayerTotalCardsScore(playerState, playerCardsScoreView);

   const { type: playerType, card: playerCard } = generatedPlayerCard;
   playerCardView.render({ type: playerType, card: playerCard, stale: false });
};

const createAndRenderDealerCard = (option = {}) => {
   // Create and save card for dealer
   const generatedDealerCard = createAndSaveCard(
      cardDeck.generatedCardsHistory,
      TYPE_DEALER,
      dealerState.cardListHistory
   );
   if (!generatedDealerCard) return;

   // Update and show dealer's total cards score only when the player hit stand button and it's the dealer's turn
   if (dealerState.cardListHistory.length > 2) {
      updateAndShowPlayerTotalCardsScore(dealerState, dealerCardsScoreView);
   }

   const { type: dealerType, card: dealerCard } = generatedDealerCard;
   dealerCardView.render({
      type: dealerType,
      card: dealerCard,
      stale: option?.staleStatus || false,
   });
};

const decideWinnerAfterStand = () => {
   if (
      dealerState.totalCardsScore > 21 ||
      playerState.totalCardsScore > dealerState.totalCardsScore
   ) {
      // Player wins
      playerState.totalScore += playerState.totalBets * 2;
      totalScoreView.updateTotalScore(playerState.totalScore);

      // Show final result message
      resultMessageView.showFinalResultMsg("You Win!");

      // Set game state to ended
      gameState.hasEnded = true;
   } else if (playerState.totalCardsScore === dealerState.totalCardsScore) {
      // Draw
      playerState.totalScore += playerState.totalBets;
      totalScoreView.updateTotalScore(playerState.totalScore);

      // Show final result message
      resultMessageView.showFinalResultMsg("Draw!");

      // Set game state to ended
      gameState.hasEnded = true;
   } else {
      // Dealer wins
      totalScoreView.updateTotalScore(playerState.totalScore);

      // Show final result message
      resultMessageView.showFinalResultMsg("You Lost!");

      // Set game state to ended
      gameState.hasEnded = true;
   }
};

const flipDealerSecondCard = async () => {
   // Flip the second card of the dealer
   dealerCardView.flipSecondCard();

   // Show and update the total score of the dealer
   updateAndShowPlayerTotalCardsScore(dealerState, dealerCardsScoreView);
   await wait(GENERATE_CARD_DELAY);
};

export const controlInitialBet = async () => {
   // Only allow player to bet if they has already placed a bet
   if (playerState.totalBets === 0) {
      alertView.showAlert("Please place your bet!");
      return;
   }

   // Change the state of the bet placement
   betState.isBetPlaced = true;

   // Animate the play buttons when the bet is placed
   await animateBtnsAfterBetPlaced();

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

export const controlHitNewCard = async () => {
   // Only allow player to hit new card if the game has not ended
   if (gameState.hasEnded) return;

   // Create and render a new card for the player
   createAndRenderPlayerCard();

   // Bust when the player's total cards score is greater than 21
   if (playerState.totalCardsScore > 21) {
      // Set game state to ended
      gameState.hasEnded = true;

      // Flip the second card of the dealer
      await wait(GENERATE_CARD_DELAY);
      await flipDealerSecondCard();

      // Show final result message
      resultMessageView.showFinalResultMsg("Busted!");

      // Clean up after the round ends
      await cleanUpAfterRoundEnd();
   }
};

export const controlStandGame = async () => {
   // Flip the second card of the dealer
   await flipDealerSecondCard();

   // Hit another card for the dealer until the total score is greater than or equal to 17
   while (dealerState.totalCardsScore < 17) {
      createAndRenderDealerCard();
      await wait(GENERATE_CARD_DELAY);
   }

   // Decide winner
   decideWinnerAfterStand();

   // Clean up after the round ends
   await cleanUpAfterRoundEnd();
};
