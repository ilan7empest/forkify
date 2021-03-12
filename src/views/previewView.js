import icons from 'url:../img/icons.svg';
import View from './View';

class PreviewView extends View {
  _parentEl = document.querySelector('.results');
  _errMsg = "Recipes were't found. Try another one";

  _generateMarkup() {
    return this._data.map(markup).join('');
  }
}

export default new PreviewView();

const markup = result => {
  return `<li class="preview">
            <a class="preview__link preview__link--active" href="#${result.id}">
              <figure class="preview__fig">
                <img src=${result.image} alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
};
