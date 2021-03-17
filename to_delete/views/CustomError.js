import icons from 'url:../img/icons.svg';

class CustomError {
  render(parent, err, type = 'error') {
    const html = markup(err, type);
    parent.insertAdjacentHTML('afterbegin', html);
  }
}

const markup = (err, type) => {
  return `<div class="${type === 'error' ? 'error' : 'message'}">
            <div>
            <svg>
                <use href="${icons}#icon-${
    type === 'error' ? 'alert-triangle' : 'smile'
  }"></use>
            </svg>
            </div>
            <p>${err}</p>
        </div>`;
};

export default new CustomError();
