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

export {
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  updateServings,
  state,
};
