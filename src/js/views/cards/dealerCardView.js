import CardView from "./cardView";

class DealerCardView extends CardView {
   _containerEl = document.querySelector(".cards--dealer");
   _dealer_cards;

   flipSecondCard() {
      this._dealer_cards = document.querySelectorAll(".card--dealer");
      const dealerSecondCard = this._dealer_cards[1];
      const dealerSecondCardFront = dealerSecondCard.children[0];
      const dealerSecondCardBack = dealerSecondCard.children[1];

      // Flip the card
      dealerSecondCardFront.classList.remove("card__side--front--stale");
      dealerSecondCardFront.style.animation = ".3s ease-in forwards cardFront--toBack";
      dealerSecondCardBack.classList.remove("card__side--back--stale");
      dealerSecondCardBack.style.animation = ".3s ease-in forwards cardBack--toFront";
   }
}

export default new DealerCardView();
