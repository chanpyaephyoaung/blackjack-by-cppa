export default class View {
  _data;
  _renderOptions = {
    clearBeforeAdding: true,
    position: "afterbegin",
  };

  render(data, renderOptions = this._renderOptions) {
    this._data = data;
    const { clearBeforeAdding, position } = renderOptions;

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
