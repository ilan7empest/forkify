import spinner from './spinner';
import errorView from './errorView';
class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.error();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderSpinner() {
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', spinner._generateMarkup());
  }
  error(err = this._errorMsg) {
    this._clear();
    this._parentEl.insertAdjacentHTML(
      'afterbegin',
      errorView._generateMarkup(err)
    );
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
}

export default View;
