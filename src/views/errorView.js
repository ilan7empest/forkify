import View from './View';
import icons from 'url:../img/icons.svg';

class ErrorView {
  _generateMarkup(err) {
    return `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${err}</p>
          </div>`;
  }
}

export default new ErrorView();
