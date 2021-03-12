import icons from 'url:../img/icons.svg';

const html = `<div class="spinner">
                  <svg>
                    <use href="${icons}#icon-loader"></use>
                  </svg>
                </div>`;

export default Spinner = parentEl => {
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', html);
};
