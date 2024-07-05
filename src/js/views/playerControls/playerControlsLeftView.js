import PlayerControlsView from "./playerControlsView";

class PlayerControlsLeftView extends PlayerControlsView {
   _containerEl = document.querySelector(".player__controls__left");

   addHandlerBtnDoubleDown(handler) {
      this._containerEl.addEventListener("click", (e) => {
         if (e.target.classList.contains("btn--double-down")) handler();
         else return;
      });
   }
}

export default new PlayerControlsLeftView();
