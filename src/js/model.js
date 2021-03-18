import { AJAX } from './helpers';
import { PAGINATE_PER_PAGE } from './constants';

const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    perPage: PAGINATE_PER_PAGE,
  },
  bookmarks: [],
};

const loadRecipe = async id => {
  try {
    let { recipe } = await AJAX(id);
    // const existingBookmark = state.bookmarks.find(bm => bm.id === recipe.id);
    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      title: recipe.title,
      sourceUrl: recipe.source_url,
    };

    // if (existingBookmark) state.recipe.bookmarked = true;
    if (state.bookmarks.some(bm => bm.id === recipe.id))
      state.recipe.bookmarked = true;
  } catch (err) {
    throw err;
  }
};

const loadSearchResults = async query => {
  try {
    state.search.query = query;
    let { recipes } = await AJAX(`?search=${query}`);
    state.search.results = recipes.map(recipe => ({
      id: recipe.id,
      image: recipe.image_url,
      title: recipe.title,
      publisher: recipe.publisher,
    }));
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

const getSearchResultsPage = (
  page = state.search.page,
  perPage = state.search.perPage
) => {
  state.search.page = page;
  state.search.perPage = perPage;

  const slicedResults = () => {
    const start = (state.search.page - 1) * state.search.perPage;
    return state.search.results.slice(start, start + state.search.perPage);
  };

  return slicedResults();
};

const updateServings = servings => {
  const updateIngredients = state.recipe.ingredients.map(ingr => {
    ingr.quantity = (ingr.quantity * servings) / state.recipe.servings;
    return ingr;
  });
  state.recipe = {
    ...state.recipe,
    ingredients: updateIngredients,
    servings,
  };
};

const addToBookmark = recipe => {
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  // const existingBookmark = state.bookmarks.find(bm => bm.id === recipe.id);
  // if (existingBookmark) return;
  state.bookmarks = [...state.bookmarks, recipe];
  setLocalStorage('bookmarks', state.bookmarks);
};

const removeBookmark = id => {
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  const updatedBookmarks = state.bookmarks.filter(bm => bm.id !== id);
  // const index = state.bookmarks.findIndex(bm => bm.id === id);
  // const updatedBookmarks = state.bookmarks.splice(index, 1);
  state.bookmarks = updatedBookmarks;
  setLocalStorage('bookmarks', updatedBookmarks);
};

const setLocalStorage = (key, data = []) => {
  localStorage.setItem(key, JSON.stringify(data));
};
const getLocalStorage = () => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  if (bookmarks) state.bookmarks = bookmarks;
};

getLocalStorage();

export {
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  updateServings,
  addToBookmark,
  removeBookmark,
  getLocalStorage,
  state,
};
