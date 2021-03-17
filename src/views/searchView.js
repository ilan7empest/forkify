class Search {
  _parentEl = document.querySelector('.search');
  _field = this._parentEl.querySelector('.search__field');
  getQuery() {
    const query = this._field.value;
    this.clear();
    return query;
  }
  clear() {
    this._field.value = '';
  }
  addHandleSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new Search();
