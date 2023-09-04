import View from "../View";

export default class CardView extends View {
  _renderOptions = {
    clearBeforeAdding: false,
    position: "beforeend",
  };
  _generateMarkup() {
    const { type, card } = this._data;
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
