import Spinner from '../views/Spinner';
import customError from '../views/CustomError';
class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderSpinner() {
    this._clear();
    Spinner(this._parentEl);
  }
  renderError(err = this._errMsg, type) {
    this._clear();
    customError.render(this._parentEl, err, type);
  }
}

export default View;
