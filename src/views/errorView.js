import icons from 'url:../img/icons.svg';

class ErrorView {
  _generateMarkup(msg, isError = true) {
    return `<div class=${isError ? 'error' : 'message'}>
            <div>
              <svg>
                <use href="${icons}#icon-${
      isError ? 'alert-triangle' : 'smile'
    }"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>`;
  }
}

export default new ErrorView();
