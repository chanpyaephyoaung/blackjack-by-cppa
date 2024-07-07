import View from "../View";
import { wait } from "../../helpers/helpers";
import {
   FINAL_RESULT_MSG_PRE_DELAY,
   FINAL_RESULT_SHOW_ON_UI_DURATION,
} from "../../config/finalResultMsg";
import { FINAL_RESULT_TOGGLE_DURATION } from "../../config/animationConfig";

class ResultMessageView extends View {
   _resultMsgContainer = document.querySelector(".message-box--final-result").parentElement;
   _resultMsg = document.querySelector(".message-box--final-result");
   _resultMsgEl = document.querySelector(".message-box--final-result__message");

   async showFinalResultMsg(message) {
      // A delay
      await wait(FINAL_RESULT_MSG_PRE_DELAY);

      // Show the result message
      this._resultMsgContainer.classList.remove("hidden");
      this._resultMsgEl.textContent = message;

      await wait(FINAL_RESULT_SHOW_ON_UI_DURATION);
      // Add disppearing animation
      this._resultMsg.style.animation = `disappearToBelow ${FINAL_RESULT_TOGGLE_DURATION}ms ease-out forwards`;

      // Hide final result message only after disappearing animation
      await wait(FINAL_RESULT_TOGGLE_DURATION);
      this._resultMsgContainer.classList.add("hidden");
      this._resultMsg.style.animation = "";
   }
}

export default new ResultMessageView();
