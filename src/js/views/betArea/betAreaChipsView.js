import View from "../View";
import { BET_AREA_CHIPS_CLEAR_DURATION } from "../../config/animationConfig";
import { wait } from "../../helpers/helpers.js";

class BetAreaChipsView extends View {
  _containerEl = document.querySelector(".bet-area__box__chips");
  _renderOptions = {
    clearBeforeAdding: false,
    position: "beforeend",
  };

  async clearBetAreaChips() {
    // Only reset if at least one bet is placed
    if (this._containerEl.hasChildNodes()) {
      // Add animation
      this._containerEl.style.animation = `disappearToBelow ${BET_AREA_CHIPS_CLEAR_DURATION}ms ease-in forwards`;
      await wait(BET_AREA_CHIPS_CLEAR_DURATION);
      // Reset animation and empty the container
      this._containerEl.style.animation = ``;
      this._clear();
    }
  }

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
      class="chip chip--small bet-area__box__chip"
      alt="${chipType}"
    />
    `;
  }
}

export default new BetAreaChipsView();
