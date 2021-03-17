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
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    //compare old Dom to new Dom
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currElements = Array.from(this._parentEl.querySelectorAll('*'));

    //////////
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      // updated text nodes
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      // update attributes
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
    /*for (let i = 0, x = currElements.length; i < x; i++) {
      if (currElements[i].innerHTML !== newElements[i].innerHTML) {
        currElements[i].innerHTML = newElements[i].innerHTML;
      }
    }*/
    /////////
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
