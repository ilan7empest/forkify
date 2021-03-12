// import controller from './controller';
import { AJAX } from './helpers';
import { ITEMS_PER_PAGE } from './constants';

const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    itemsPerPage: ITEMS_PER_PAGE,
  },
  bookmarks: [],
};

const populateRecipe = (data = {}) => {
  return Object.assign(state.recipe, data);
};

const loadRecipe = async id => {
  try {
    const { data } = await AJAX('/' + id);
    let { recipe } = data;
    recipe = {
      id: recipe.id,
      image: recipe.image_url,
      coockingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceURL: recipe.source_url,
      title: recipe.title,
    };
    populateRecipe(recipe);
  } catch (err) {
    throw err;
  }
};

const loadSearchResults = async searchQuery => {
  try {
    state.search.query = searchQuery;
    const { data } = await AJAX(
      `?search=${searchQuery}&key=f8a64eb6-c721-49d5-8112-a28577770385`
    );
    state.search.results = data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

const getSearchResultsPage = (
  page = state.search.page,
  itemsPerPage = state.search.itemsPerPage
) => {
  state.search.page = page;
  state.search.itemsPerPage = itemsPerPage;

  const { results } = state.search;
  let newResults = () => {
    const start = (state.search.page - 1) * itemsPerPage;
    return results.slice(start, start + itemsPerPage);
  };
  return newResults();
};

export { state, loadRecipe, loadSearchResults, getSearchResultsPage };

/*
const lights = new Array(101).fill(true);
lights[0] = 'start';
let rounds = 0;

while (rounds < 101) {
  for (var i = 1; i < lights.length; i++) {
    if (i % rounds === 0) {
      lights[i] = !lights[i];
    } else {
      lights[i];
    }
  }
  rounds++;
}
console.log(lights);
*/
