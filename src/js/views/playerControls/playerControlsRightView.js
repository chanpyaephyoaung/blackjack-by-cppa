import View from "../View";

class PlayerControlsRightView extends View {
  _containerEl = document.querySelector(".player__controls__right");
  _btnReset = document.querySelector(".btn--reset");

  addHandlerBtnReset(handler) {
    this._btnReset.addEventListener("click", handler);
  }
}

export default new PlayerControlsRightView();
