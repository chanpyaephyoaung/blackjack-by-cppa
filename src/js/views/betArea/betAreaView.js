import View from "../View";

class BetAreaView extends View {
  _containerEl = document.querySelector(".bet-area__box");
  _renderOptions = {
    clearBeforeAdding: false,
    position: "beforeend",
  };

  _generateMarkup() {
    if (!Array.isArray(this._data)) {
      const chipType = this._data.type;
      this._renderOptions.clearBeforeAdding = false;
      return this._generateEachBetChipMarkup(chipType);
    } else {
      this._renderOptions.clearBeforeAdding = true;
      return this._data.map((chip) => this._generateEachBetChipMarkup(chip.type)).join("");
    }
  }

  _generateEachBetChipMarkup(chipType) {
    return `
      <img
      src="./img/chips/Casino-Chip-${chipType}.png"
      class="chip chip--small bet-area__box__chips"
      alt="${chipType}"
    />
    `;
  }
}

export default new BetAreaView();
