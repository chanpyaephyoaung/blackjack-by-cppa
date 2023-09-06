import CardsScoreView from "./CardsScoreView";

class DealerCardsScoreView extends CardsScoreView {
  _containerEl = document.querySelector(".cards__score--dealer");
}

export default new DealerCardsScoreView();
