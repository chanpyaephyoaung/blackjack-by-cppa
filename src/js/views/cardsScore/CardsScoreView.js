import { CARDS_SCORE_ANIMATION_DURATION } from "../../config/animationConfig";
import { wait } from "../../helpers/helpers";

export default class CardsScoreView {
   showCardsScore(score) {
      this._containerEl.classList.remove("hidden");
      this._containerEl.textContent = score;
   }

   async animateCardsScore() {
      this._containerEl.style.animation = `scaleCardScoreBox ${CARDS_SCORE_ANIMATION_DURATION}ms ease-in forwards`;

      await wait(CARDS_SCORE_ANIMATION_DURATION);
      this._containerEl.style.animation = "";
   }
}
