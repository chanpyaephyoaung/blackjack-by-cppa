class TotalScoreView {
  _containerEl = document.querySelector(".total-score-container__value");

  addHandlerDisplayScore(handler) {
    window.addEventListener("load", handler);
  }

  updateTotalScore(val) {
    this._containerEl.textContent = `$${val}`;
  }
}

export default new TotalScoreView();
