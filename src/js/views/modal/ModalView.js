import { MODAL_TOGGLE_DURATION } from "../../config/animationConfig";
import { wait } from "../../helpers/helpers.js";

export default class ModalView {
  _overlay = document.querySelector(".overlay");

  _showModal() {
    this._overlay.classList.remove("hidden");
    this._modalContainer.classList.remove("hidden");
  }

  async _hideModal() {
    this._overlay.classList.add("hidden");
    this._modal.style.animation = `disappearToBelow ${MODAL_TOGGLE_DURATION}ms ease-in forwards`;

    await wait(MODAL_TOGGLE_DURATION);
    this._modalContainer.classList.add("hidden");
    this._modal.style.animation = "";
  }

  _addHandlerShowModal() {
    this._btnOpenModal.addEventListener("click", this._showModal.bind(this));
  }

  _addHandlerHideModal() {
    this._btnCloseModal.addEventListener("click", this._hideModal.bind(this));
    this._overlay.addEventListener("click", this._hideModal.bind(this));
  }
}
