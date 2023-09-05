import View from "../View";

export default class CardView extends View {
  _renderOptions = {
    clearBeforeAdding: false,
    position: "beforeend",
  };

  _generateMarkup() {
    console.log(this._data);
    const { type, card, stale } = this._data;

    const staleCardMarkup = this._generateStaleCardMarkup(type, card);

    if (stale) {
      console.log(staleCardMarkup);
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
        class="shit card__side card__side--${type} card__side--front card__side--front--stale card__side--${type}--front"
        />
        <img
        src="./img/cards/card--${card.value}-${card.suit}.png"
        class="shit card__side card__side--${type} card__side--back card__side--back--stale card__side--${type}--back"
        />
      </div>
    `;
  }
}
