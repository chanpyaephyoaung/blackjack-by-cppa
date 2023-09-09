import View from "../View";
import { REMOVE_INITIAL_PLAY_CONTROLS_BTNS_ANIMATION_DURATION } from "../../config/animationConfig";
import { wait } from "../../helpers/helpers";

export default class PlayerControlsView extends View {
  _renderOptions = {
    clearBeforeAdding: true,
    position: "beforeend",
  };

  async render(data, renderOptions = this._renderOptions) {
    this._data = data;

    const markup = this._generateMarkup();
    const { clearBeforeAdding, position } = renderOptions;

    if (clearBeforeAdding) {
      this._clear();
    }

    this._containerEl.insertAdjacentHTML(position, markup);

    // Remove initial animation to avoid conflicting with pseudo styles
    await wait(REMOVE_INITIAL_PLAY_CONTROLS_BTNS_ANIMATION_DURATION);
    this._removeBtnsInitialAnimation();
  }

  _generateMarkup() {
    return this._data
      .map(
        (btn) => `
      <button type="button" class="btn btn--${btn.variant} btn--play btn--${btn.type}">${btn.type}</button>
    `
      )
      .join("");
  }

  _removeBtnsInitialAnimation() {
    const playBtns = document.querySelectorAll(`.btn--play`);

    // Remove initial animation class
    playBtns.forEach((btn) => btn.classList.remove("btn--play"));
  }
}
