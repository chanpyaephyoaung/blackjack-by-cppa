import { wait } from "./helpers";
import dealerCardView from "../views/cards/dealerCardView";
import playerCardView from "../views/cards/playerCardView";
import playerCardsScoreView from "../views/cardsScore/playerCardsScoreView";
import dealerCardsScoreView from "../views/cardsScore/dealerCardsScoreView";
import playerControlsLeftBtnsView from "../views/buttons/playerControlsLeftBtnsView";
import playerControlsRightBtnsView from "../views/buttons/playerControlsRightBtnsView";
import betAreaChipsView from "../views/betArea/betAreaChipsView";
import resultMessageView from "../views/resultMessage/resultMessageView";
import totalBetView from "../views/totalBet/totalBetView";
import { addInitialBtns } from "./buttonHelpers";
import { flipDealerSecondCard } from "./cardHelpers";
import { updateTotalScoresAfterRoundEnd } from "./totalScoreHelpers";
import { playerState } from "../models/playerState";
import { dealerState } from "../models/dealerState";
import { cardDeck } from "../models/cardDeck";
import { gameState } from "../models/gameState";
import { betState } from "../models/chipsState";
import { CLEAN_UP_BTNS_AFTER_FINAL_RESULT_DELAY } from "../config/animationConfig";
import { TYPE_PLAYER, TYPE_DEALER } from "../config/generalConfig";

export const cleanUpAfterRoundEnd = async () => {
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

   // Reset both player, dealer and card deck card list history
   playerState.cardListHistory = [];
   dealerState.cardListHistory = [];
   cardDeck.generatedCardsHistory = [];

   // Reset game states
   gameState.hasEnded = false;
   betState.isBetPlaced = false;

   // Show the initial play controls right buttons
   await addInitialBtns();
};

export const decideWinnerForBlackjack = async () => {
   if (playerState.totalCardsScore === 21 && dealerState.totalCardsScore !== 21) {
      // Flip the second card of the dealer
      await flipDealerSecondCard();
      // Player Blackjack
      playerState.totalScore += playerState.totalBets * 2.5;
      // Show final result message
      await resultMessageView.showFinalResultMsg("Blackjack!");
      updateTotalScoresAfterRoundEnd();
   } else if (dealerState.totalCardsScore === 21 && playerState.totalCardsScore !== 21) {
      // Dealer Blackjack
      // Flip the second card of the dealer
      await flipDealerSecondCard();
      // Show final result message
      await resultMessageView.showFinalResultMsg("You Lost!");
      updateTotalScoresAfterRoundEnd();
   } else if (playerState.totalCardsScore === 21 && dealerState.totalCardsScore === 21) {
      // Draw (Both dealer and player Blackjack)
      playerState.totalScore += playerState.totalBets;
      // Show final result message
      await resultMessageView.showFinalResultMsg("Draw!");
      updateTotalScoresAfterRoundEnd();
   } else {
      return;
   }
};

export const decideWinnerAfterStand = async () => {
   if (
      dealerState.totalCardsScore > 21 ||
      playerState.totalCardsScore > dealerState.totalCardsScore
   ) {
      // Player wins
      playerState.totalScore += playerState.totalBets * 2;
      // Show final result message
      await resultMessageView.showFinalResultMsg("You Won!");
   } else if (playerState.totalCardsScore === dealerState.totalCardsScore) {
      // Draw
      playerState.totalScore += playerState.totalBets;
      // Show final result message
      await resultMessageView.showFinalResultMsg("Draw!");
   } else {
      // Dealer wins
      // Show final result message
      await resultMessageView.showFinalResultMsg("You Lost!");
   }
   updateTotalScoresAfterRoundEnd();
};
