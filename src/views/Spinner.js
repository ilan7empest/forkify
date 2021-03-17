import View from './View';
import icons from 'url:../img/icons.svg';

class Spinner {
  _generateMarkup() {
    return `<div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>`;
  }
}

export default new Spinner();
