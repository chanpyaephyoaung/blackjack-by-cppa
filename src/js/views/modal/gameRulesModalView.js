import ModalView from "./ModalView";

class GameRulesModalView extends ModalView {
  _modalContainer = document.querySelector(".modal--game-rules").parentElement;
  _modal = document.querySelector(".modal--game-rules");
  _btnOpenModal = document.querySelector(".header__icon--game-rules");
  _btnCloseModal = document.querySelector(".modal__close-icon--game-rules");

  constructor() {
    super();
    this._addHandlerShowModal();
    this._addHandlerHideModal();
  }
}

export default new GameRulesModalView();
