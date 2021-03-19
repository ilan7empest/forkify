import View from './View';
import icons from 'url:../img/icons.svg';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _message = 'Recipe Uploaded Sucessfuly';

  _overlay = document.querySelector('.overlay');
  _modal = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnUpload = document.querySelector('.upload__btn');

  constructor() {
    super();
    this._addHandlerModal();
  }
  _generateMarkup() {}

  toogleModal() {
    [this._overlay, this._modal].forEach(el => el.classList.toggle('hidden'));
  }
  _addHandlerModal() {
    [this._btnOpen, this._btnClose, this._overlay].forEach(el =>
      el.addEventListener('click', this.toogleModal.bind(this))
    );
  }
  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      const recipe = Object.fromEntries(data);
      //   let recipe = {};
      //   for (let [key, value] of data) {
      //     recipe[key] = value;
      //   }
      handler(recipe);
    });
  }
}

export default new AddRecipeView();
