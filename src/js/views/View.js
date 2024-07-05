export default class View {
   _data;
   _renderOptions = {
      clearBeforeAdding: true,
      position: "afterbegin",
   };

   render(data, renderOptions = this._renderOptions) {
      console.log(data);
      this._data = data;

      const markup = this._generateMarkup();
      const { clearBeforeAdding, position } = renderOptions;

      if (clearBeforeAdding) {
         this._clear();
      }

      this._containerEl.insertAdjacentHTML(position, markup);
   }

   _clear() {
      this._containerEl.innerHTML = "";
   }
}
