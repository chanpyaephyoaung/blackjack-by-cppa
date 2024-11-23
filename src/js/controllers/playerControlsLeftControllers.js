import { gameState } from "../models/gameState";
import { wait } from "../helpers/helpers";
import { playerState } from "../models/playerState";
import { dealerState } from "../models/dealerState";
import { GENERATE_CARD_DELAY } from "../config/animationConfig";
import { flipDealerSecondCard } from "../helpers/cardHelpers";
import resultMessageView from "../views/resultMessage/resultMessageView";
import { cleanUpAfterRoundEnd } from "../helpers/roundHelpers";
import { createAndRenderDealerCard } from "../helpers/cardHelpers";
import { decideWinnerAfterDoubleDown } from "../helpers/roundHelpers";
import { createAndRenderPlayerCard } from "../helpers/cardHelpers";
import { updateTotalScoresAfterRoundEnd } from "../helpers/totalScoreHelpers";
import totalBetView from "../views/totalBet/totalBetView";

export const controlDoubleDown = async () => {
   // Only allow player to hit new card if the game has not ended
   if (gameState.hasEnded) return;

   // Set game state to ended
   gameState.hasEnded = true;

   // Double the player's bet
   const newTotalBets = playerState.totalBets * 2;
   playerState.totalBets = newTotalBets;
   totalBetView.updateTotalBetsVal(newTotalBets);

   // Create and render a new card for the player
   createAndRenderPlayerCard();

   // Bust when the player's total cards score is greater than 21
   if (playerState.totalCardsScore > 21) {
      // Flip the second card of the dealer
      await wait(GENERATE_CARD_DELAY);
      await flipDealerSecondCard();

      // Decide winner
      await decideWinnerAfterDoubleDown();

      // Clean up after the round ends
      await cleanUpAfterRoundEnd();
   }

   await flipDealerSecondCard();

   // Hit another card for the dealer until the total score is greater than or equal to 17
   while (dealerState.totalCardsScore < 17) {
      createAndRenderDealerCard();
      await wait(GENERATE_CARD_DELAY);
   }

   // Decide winner
   await decideWinnerAfterDoubleDown();

   // Clean up after the round ends
   await cleanUpAfterRoundEnd();
};
