import icons from 'url:../img/icons.svg';
import View from './View';

class Pagination extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    const { page: currPage, itemsPerPage, results } = this._data;
    const totalPages = Math.ceil(results.length / itemsPerPage);
    // page 1 and more pages
    if (currPage === 1 && totalPages > 1) {
      return this._nextPage();
    }
    // last page
    if (currPage === totalPages && totalPages > 1) {
      return this._previousPage();
    }
    // between pages
    if (currPage > 1 && currPage < totalPages) {
      return `
            ${this._previousPage()}
            ${this._nextPage()}
        `;
    }

    // page 1 and no other pages
    return '';
  }

  _nextPage() {
    return `<button data-goto=${
      this._data.page + 1
    } class="btn--inline pagination__btn--next">
                <span>Page ${this._data.page + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
          </button>`;
  }
  _previousPage() {
    return `<button data-goto=${
      this._data.page - 1
    } class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${this._data.page - 1}</span>
            </button>`;
  }

  addHandlePagination(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goto = +btn.dataset.goto;
      handler(goto);

      /*if (target.classList.contains('pagination__btn--next')) {
        handler('increment');
      }
      if (target.classList.contains('pagination__btn--prev')) {
        handler('decrement');
      }*/
    });
  }
}

export default new Pagination();
