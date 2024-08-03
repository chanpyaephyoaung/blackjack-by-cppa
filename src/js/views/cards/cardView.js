import View from "../View";
import { wait } from "../../helpers/helpers.js";
import { CARD_DECK_DISAPPEAR_DURATION } from "../../config/animationConfig.js";
import { TYPE_DEALER, TYPE_PLAYER } from "../../config/generalConfig.js";

export default class CardView extends View {
   _renderOptions = {
      clearBeforeAdding: false,
      position: "beforeend",
   };

   _generateMarkup() {
      const { type, card, stale } = this._data;

      const staleCardMarkup = this._generateStaleCardMarkup(type, card);

      if (stale) {
         return staleCardMarkup;
      } else {
         return `
        <div class="card card--${type}">
          <img
          src="./img/cards/card--${card.value}-${card.suit}.png"
          class="card__side card__side--${type} card__side--front card__side--${type}--front"
          />
          <img
          src="./img/cards/card-back.png"
          class="card__side card__side--${type} card__side--back card__side--${type}--back"
          />
        </div>
      `;
      }
   }

   _generateStaleCardMarkup(type, card) {
      return `
      <div class="card card--${type}">
        <img
        src="./img/cards/card-back.png"
        class="card__side card__side--${type} card__side--front card__side--front--stale card__side--${type}--front"
        />
        <img
        src="./img/cards/card--${card.value}-${card.suit}.png"
        class="card__side card__side--${type} card__side--back card__side--back--stale card__side--${type}--back"
        />
      </div>
    `;
   }

   clearCards(cardType) {
      const cards = document.querySelectorAll(`.card--${cardType}`);
      cards.forEach((card) => card.remove());
   }

   async clearCardDeck(deckType) {
      const deck = document.querySelector(`.card__deck--${deckType}`);
      const animationDirection = deckType === TYPE_PLAYER ? "disappearToRight" : "disappearToLeft";
      deck.style.animation = `${
         CARD_DECK_DISAPPEAR_DURATION / 1000
      }s ease-out forwards ${animationDirection}`;
      await wait(CARD_DECK_DISAPPEAR_DURATION);
      deck.style.animation = "";
   }
}
