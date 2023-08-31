import View from "../View";

class ChipsListView extends View {
  _containerEl = document.querySelector(".chips__container");
  _options = {
    clearBeforeAdding: false,
    position: "beforeend",
  };

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map(
        (chip) =>
          `
        <img src="./img/chips/Casino-Chip-${chip.type}.png" class="chip chip--regular" alt="${chip.type} valued chip" />
        `
      )
      .join("");
  }
}

export default new ChipsListView();
