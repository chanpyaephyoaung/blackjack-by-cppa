class TotalBetViews {
  _containerEls = document.querySelectorAll(".total-bets-value");

  constructor() {
    window.addEventListener("load", () => {
      console.log(this);
      this.updateTotalBetsVal(0);
    });
  }

  updateTotalBetsVal(val) {
    this._containerEls.forEach((el) => (el.textContent = `$${val}`));
  }
}

export default new TotalBetViews();
