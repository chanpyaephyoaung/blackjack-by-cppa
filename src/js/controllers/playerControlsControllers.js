import betAreaChipsView from "../views/betArea/betAreaChipsView";
import totalBetView from "../views/totalBet/totalBetView";
import totalScoreView from "../views/totalScore/totalScoreView";
import playerCardView from "../views/cards/playerCardView";
import alertView from "../views/alert/alertView";
import { generateRandCard, wait } from "../helpers/helpers";
import { playerState } from "../models/playerState";
import { cardDeck } from "../models/cardDeck";
import { GENERATE_CARD_DELAY } from "../config/animationConfig";
import { INITIAL_GENERATE_CARD_COUNT, TOTAL_CARDS_NUM } from "../config/cardConfig";

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

const createCard = (cardDeckHistory, playerType) => {
  let { type, card } = generateRandCard(playerType);
  if (cardDeckHistory.length > 0) {
    while (cardDeckHistory.some((generatedCard) => generatedCard.id === card.id)) {
      if (cardDeckHistory.length === TOTAL_CARDS_NUM) {
        alertView.showAlert("Card Deck Limit Reached!");
        return;
      } else {
        type = generateRandCard("player").type;
        card = generateRandCard("player").card;
      }
    }
  }

  return { type, card };
};

export const controlInitialBet = async () => {
  // Only allow player to bet if they has already placed a bet
  if (playerState.totalBets === 0) {
    alertView.showAlert("Please place your bet!");
    return;
  }

  // Create and store a random card
  for (let i = 0; i < INITIAL_GENERATE_CARD_COUNT; i++) {
    // Create a card
    const generatedCard = createCard(cardDeck.generatedCardsHistory, "player");
    // Guard clause
    if (!generatedCard) return;
    const { type, card } = generatedCard;

    // Render a card
    playerCardView.render({ type, card });

    // Store card to both player card history and card deck history
    playerState.cardListHistory.push(card);
    cardDeck.generatedCardsHistory.push(card);

    // Delay after rendering each card
    await wait(GENERATE_CARD_DELAY);
  }
};
