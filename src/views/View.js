import * as Spinner from '../views/Spinner';
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
    Spinner.start(this._parentEl);
  }
  removeSpinner() {
    Spinner.remove(this._parentEl);
  }
  renderError(err = this._errMsg, type) {
    this._clear();
    customError.render(this._parentEl, err, type);
  }
}

export default View;
