import View from "../View";

class BetAreaView extends View {
  _containerEl = document.querySelector(".bet-area__box");
  _renderOptions = {
    clearBeforeAdding: false,
    position: "beforeend",
  };

  _generateMarkup() {
    const chipType = this._data.type;
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
