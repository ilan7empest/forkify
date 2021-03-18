import PreviewView from './previewView';

class BookmarkView extends PreviewView {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMsg = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerBookmarks(handler) {
    window.addEventListener('load', handler);
  }
  // _generateMarkup() {
  //   return this._data.map(bookmark => markup(bookmark)).join('');
  // }
}

export default new BookmarkView();

// const markup = bm => {
//   const id = window.location.hash.slice(1);
//   return `
//         <li class="preview">
//             <a class="preview__link ${
//               bm.id === id && 'preview__link--active'
//             }" href="#${bm.id}">
//                 <figure class="preview__fig">
//                     <img src="${bm.image}" alt="${bm.title}" />
//                 </figure>
//                 <div class="preview__data">
//                     <h4 class="preview__title">
//                     ${bm.title}
//                     </h4>
//                     <p class="preview__publisher">${bm.publisher}</p>
//                 </div>
//             </a>
//         </li>
//     `;
// };
