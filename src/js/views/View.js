export default class View {
  _data;
  _options = {
    clearBeforeAdding: true,
    position: "afterbegin",
  };

  render(data, options = this._options) {
    this._data = data;
    const { clearBeforeAdding, position } = options;

    const markup = this._generateMarkup();

    if (clearBeforeAdding) {
      this._clear();
    }

    this._containerEl.insertAdjacentHTML(position, markup);
  }

  _clear() {
    this._containerEl.innerHTML = "";
  }
}
