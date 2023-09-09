import PlayerControlsView from "./playerControlsView";

class PlayerControlsRightView extends PlayerControlsView {
  _containerEl = document.querySelector(".player__controls__right");

  addHandlerInitialRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerBtnReset(handler) {
    this._containerEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn--reset")) handler();
      else return;
    });
  }

  addHandlerBtnBet(handler) {
    this._containerEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn--bet")) handler();
      else return;
    });
  }
}

export default new PlayerControlsRightView();
