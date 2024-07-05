import View from "../View";
import { wait } from "../../helpers/helpers";
import {
   REMOVE_INITIAL_PLAY_CONTROLS_BTNS_ANIMATION_DURATION,
   HIDE_BTN_ANIMATION_DURATION,
} from "../../config/animationConfig";

export default class ButtonView extends View {
   _renderOptions = {
      clearBeforeAdding: true,
      position: "beforeend",
   };

   async addBtn(data, renderOptions = this._renderOptions) {
      this.render(data, renderOptions);

      // Remove initial animation to avoid conflicting with pseudo styles
      await wait(REMOVE_INITIAL_PLAY_CONTROLS_BTNS_ANIMATION_DURATION);
      this._removeBtnsInitialAnimation();
   }

   async removeBtns(btnTypesArr) {
      await this._addBtnHiddenAnimation(btnTypesArr);
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

   async _addBtnHiddenAnimation(btnTypes) {
      for (const btnType of btnTypes) {
         const targetBtn = document.querySelector(`.btn--${btnType}`);
         if (targetBtn) {
            // Ensure targetBtn exists
            targetBtn.classList.add("btn--hide");
            await wait(HIDE_BTN_ANIMATION_DURATION);
            targetBtn.classList.add("hidden");
         }
      }
   }
}
