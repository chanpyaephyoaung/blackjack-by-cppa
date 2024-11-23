import betAreaChipsView from "../views/betArea/betAreaChipsView";
import totalBetView from "../views/totalBet/totalBetView";
import totalScoreView from "../views/totalScore/totalScoreView";
import alertView from "../views/alert/alertView";
import resultMessageView from "../views/resultMessage/resultMessageView";
import { wait } from "../helpers/helpers";
import { playerState } from "../models/playerState";
import { dealerState } from "../models/dealerState";
import { betState } from "../models/chipsState";
import { gameState } from "../models/gameState";
import { GENERATE_CARD_DELAY } from "../config/animationConfig";
import { INITIAL_GENERATE_CARD_COUNT } from "../config/cardConfig";
import { addInitialBtns } from "../helpers/buttonHelpers";
import { animateBtnsAfterBetPlaced } from "../helpers/buttonHelpers";
import {
   createAndRenderPlayerCard,
   createAndRenderDealerCard,
   flipDealerSecondCard,
} from "../helpers/cardHelpers";
import {
   decideWinnerForBlackjack,
   decideWinnerAfterStand,
   cleanUpAfterRoundEnd,
} from "../helpers/roundHelpers";

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

   // FOR TESTING PURPOSES
   // createAndRenderCustomPlayerCard(1, 1);
   // createAndRenderCustomPlayerCard(4, 10);

   for (let i = 0; i < INITIAL_GENERATE_CARD_COUNT; i++) {
      // Create and save cards for both player and dealer
      // For Player (Comment out for testing purposes)
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

   // Decide winner for Blackjack
   await decideWinnerForBlackjack();

   // Clean up after the round ends
   if (gameState.hasEnded) await cleanUpAfterRoundEnd();
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
      await resultMessageView.showFinalResultMsg("Busted!");

      // Clean up after the round ends
      await cleanUpAfterRoundEnd();
   }
};

export const controlStandGame = async () => {
   console.log("Stand Game!");
   // Flip the second card of the dealer
   await flipDealerSecondCard();

   // Hit another card for the dealer until the total score is greater than or equal to 17
   while (dealerState.totalCardsScore < 17) {
      createAndRenderDealerCard();
      await wait(GENERATE_CARD_DELAY);
   }

   // Decide winner
   await decideWinnerAfterStand();

   // Clean up after the round ends
   await cleanUpAfterRoundEnd();
};
