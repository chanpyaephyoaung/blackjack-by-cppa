import CardsScoreView from "./CardsScoreView";

class PlayerCardsScoreView extends CardsScoreView {
  _containerEl = document.querySelector(".cards__score--player");
}

export default new PlayerCardsScoreView();
