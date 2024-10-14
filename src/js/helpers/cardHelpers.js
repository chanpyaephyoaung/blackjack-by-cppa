import dealerCardView from "../views/cards/dealerCardView";
import playerCardView from "../views/cards/playerCardView";
import dealerCardsScoreView from "../views/cardsScore/dealerCardsScoreView";
import playerCardsScoreView from "../views/cardsScore/playerCardsScoreView";
import alertView from "../views/alert/alertView";
import { wait } from "./helpers";
import { updateCardsTotalScore } from "./helpers";
import { playerState } from "../models/playerState";
import { dealerState } from "../models/dealerState";
import { cardDeck } from "../models/cardDeck";
import { generateRandCard } from "./helpers";
import { TYPE_DEALER, TYPE_PLAYER } from "../config/generalConfig";
import { TOTAL_CARDS_NUM } from "../config/cardConfig";
import { GENERATE_CARD_DELAY } from "../config/animationConfig";

export const updateAndShowPlayerTotalCardsScore = (playerTypeState, playerTypeCardsScoreView) => {
   const playerTotalCardsScoreVals = playerTypeState.cardListHistory.map(({ value }) => value);
   playerTypeState.totalCardsScore = updateCardsTotalScore(playerTotalCardsScoreVals);
   playerTypeCardsScoreView.showCardsScore(playerTypeState.totalCardsScore);
   playerTypeCardsScoreView.animateCardsScore();
};

export const createAndSaveCard = (cardDeckHistory, playerType, playerTypeCardHistory) => {
   let { type, card } = generateRandCard(playerType);
   if (cardDeckHistory.length > 0) {
      // Check if the card is already in the card deck history. Change another if true
      while (cardDeckHistory.some((generatedCard) => generatedCard.id === card.id)) {
         if (cardDeckHistory.length === TOTAL_CARDS_NUM) {
            alertView.showAlert("Card Deck Limit Reached!");
            return;
         } else {
            // COMMENT OUT FOR TESTING PURPOSES
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

export const flipDealerSecondCard = async () => {
   // Flip the second card of the dealer
   dealerCardView.flipSecondCard();

   // Show and update the total score of the dealer
   updateAndShowPlayerTotalCardsScore(dealerState, dealerCardsScoreView);
   await wait(GENERATE_CARD_DELAY);
};

export const createAndRenderPlayerCard = () => {
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

export const createAndRenderDealerCard = (option = {}) => {
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

// For TESTING PURPOSES
export const createAndRenderCustomPlayerCard = (suit, value) => {
   const playerType = TYPE_PLAYER;
   const playerCard = {
      id: `${value}-${suit}`,
      value,
      suit,
   };

   // Save card
   playerState.cardListHistory.push(playerCard);

   // Update and show player's total cards score
   updateAndShowPlayerTotalCardsScore(playerState, playerCardsScoreView);

   playerCardView.render({ type: playerType, card: playerCard, stale: false });
};
