import View from "../View";
import { CHIPS_LIST_CONTAINER_SCROLL_AMOUNT } from "../../config/chipsConfig";

class ChipsListView extends View {
  _containerEl = document.querySelector(".chips__container");
  _navigatorLeft = document.querySelector(".chips-container__navigator--left");
  _navigatorRight = document.querySelector(".chips-container__navigator--right");
  _renderOptions = {
    clearBeforeAdding: false,
    position: "afterbegin",
  };

  constructor() {
    super();
    this._navigatorLeft.addEventListener("click", this._scrollLeft.bind(this));
    this._navigatorRight.addEventListener("click", this._scrollRight.bind(this));
  }

  addHandlerPlaceBet(handler) {
    this._containerEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("chip")) {
        // Retrieve the placed bet
        const placedBet = {
          type: e.target.dataset.chipType,
          value: +e.target.dataset.chipValue,
        };

        handler(placedBet);
      }
    });
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _scrollLeft() {
    this._containerEl.scrollLeft -= CHIPS_LIST_CONTAINER_SCROLL_AMOUNT;
  }

  _scrollRight() {
    this._containerEl.scrollLeft += CHIPS_LIST_CONTAINER_SCROLL_AMOUNT;
  }

  _generateMarkup() {
    return this._data
      .map(
        (chip) =>
          `
        <img src="./img/chips/Casino-Chip-${chip.type}.png" class="chip chip--regular" data-chip-type=${chip.type} data-chip-value =${chip.value} alt="${chip.type} valued chip" />
        `
      )
      .join("");
  }
}

export default new ChipsListView();
