import { CHIPS_LIST_CONTAINER_SCROLL_AMOUNT } from "../../config/chipsConfig";

class ChipsListContainerView {
  _containerEl = document.querySelector(".chips__container");
  _navigatorLeft = document.querySelector(".chips-container__navigator--left");
  _navigatorRight = document.querySelector(".chips-container__navigator--right");

  _scrollLeft() {
    this._containerEl.scrollLeft -= CHIPS_LIST_CONTAINER_SCROLL_AMOUNT;
  }

  _scrollRight() {
    this._containerEl.scrollLeft += CHIPS_LIST_CONTAINER_SCROLL_AMOUNT;
  }

  constructor() {
    this._navigatorLeft.addEventListener("click", this._scrollLeft.bind(this));
    this._navigatorRight.addEventListener("click", this._scrollRight.bind(this));
  }
}

export default new ChipsListContainerView();
