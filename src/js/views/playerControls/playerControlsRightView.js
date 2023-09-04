import View from "../View";

class PlayerControlsRightView extends View {
  _containerEl = document.querySelector(".player__controls__right");
  _btnReset = document.querySelector(".btn--reset");
  _btnBet = document.querySelector(".btn--bet");

  addHandlerBtnReset(handler) {
    this._btnReset.addEventListener("click", handler);
  }

  addHandlerBtnBet(handler) {
    this._btnBet.addEventListener("click", handler);
  }
}

export default new PlayerControlsRightView();
