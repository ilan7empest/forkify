import View from './View';
import icons from 'url:../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _generateMarkup() {
    const { page: currPage, perPage, results } = this._data;
    const totalPages = Math.ceil(results.length / perPage);

    // 1st page and no other pages
    if (currPage === 1 && results.length < perPage) return;

    // 1st page and are more pages
    if (currPage === 1 && totalPages > 1) {
      return this._renderNext();
    }

    // last page
    if (currPage === totalPages && totalPages > 1) {
      return this._renderPrevious();
    }

    return this._renderNext().concat(this._renderPrevious());
  }
  _renderNext() {
    const markup = `<button class="btn--inline pagination__btn--next" data-page=${
      this._data.page + 1
    }>
                        <span>Page ${this._data.page + 1}</span>
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                    </button>`;
    return markup;
  }
  _renderPrevious() {
    const markup = `<button class="btn--inline pagination__btn--prev" data-page=${
      this._data.page - 1
    }>
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${this._data.page - 1}</span>
                    </button>`;
    return markup;
  }
  addHandlerPaginate(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const pageNum = +btn.dataset.page;
      return handler(pageNum);
    });
  }
}

export default new PaginationView();
