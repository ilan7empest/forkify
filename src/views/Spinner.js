import icons from 'url:../img/icons.svg';

const html = `<div class="spinner">
                  <svg>
                    <use href="${icons}#icon-loader"></use>
                  </svg>
                </div>`;

const start = parentEl => {
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', html);
};
const remove = parentEl => {
  parentEl.querySelector('.spinner').remove();
};

export { start, remove };
