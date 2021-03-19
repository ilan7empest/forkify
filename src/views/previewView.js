import View from './View';
import icons from 'url:../img/icons.svg';

import { API_KEY } from '../js/constants';

class PreviewView extends View {
  _generateMarkup() {
    return this._data.map(recipe => markup(recipe)).join('');
  }
}

export default PreviewView;

const markup = recipe => {
  const id = window.location.hash.slice(1);
  return `<li class="preview">
            <a class="preview__link ${
              id === recipe.id && 'preview__link--active'
            }" href="#${recipe.id}">
              <figure class="preview__fig">
                <img src=${recipe.image} alt="${recipe.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
               ${
                 recipe.key === API_KEY
                   ? `<div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>`
                   : ''
               }
              </div>
            </a>
          </li>`;
};
