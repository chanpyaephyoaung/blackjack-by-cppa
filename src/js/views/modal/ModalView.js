import View from "../View";

export default class ModalView extends View {
  _overlay = document.querySelector(".overlay");

  toggleModal() {
    this._overlay.classList.toggle("hidden");
    this._modalContainer.classList.toggle("hidden");
  }

  _addHandlerShowModal() {
    console.log("Modal opened!");
    this._btnOpenModal.addEventListener("click", this.toggleModal.bind(this));
  }

  _addHandlerHideModal() {
    this._btnCloseModal.addEventListener("click", this.toggleModal.bind(this));
    this._overlay.addEventListener("click", this.toggleModal.bind(this));
  }
}
