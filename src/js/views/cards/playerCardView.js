import CardView from "./cardView";

class PlayerCardView extends CardView {
   _containerEl = document.querySelector(".cards--player");
   _playerCardEls = document.querySelectorAll(".card--player");
}

export default new PlayerCardView();
