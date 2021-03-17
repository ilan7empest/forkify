import View from './View';
import icons from 'url:../img/icons.svg';

class PreviewView extends View {
  _parentEl = document.querySelector('.results');
  _errorMsg = 'Recipe could not be found for your query, Try again!';
  _generateMarkup() {
    return this._data.map(recipe => markup(recipe)).join('');
  }
}

export default new PreviewView();

const markup = recipe => {
  return `<li class="preview">
            <a class="preview__link preview__link--active" href="#${recipe.id}">
              <figure class="preview__fig">
                <img src=${recipe.image} alt="${recipe.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
};
