import * as model from './model';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import recipeView from '../views/recipeView';
import resultsView from '../views/resultsView';
import searchView from '../views/searchView';

// https://forkify-api.herokuapp.com/api/v2/recipes

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.error();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    // 1 get search query
    const query = searchView.getQuery();
    if (!query) throw new Error('Enter some search value');

    // 2 load search results
    await model.loadSearchResults(query);

    // 3 render results
    resultsView.render(model.state.search.results);
  } catch (err) {
    resultsView.error(err);
  }
};

function init() {
  recipeView.addHandleRender(controlRecipes);
  searchView.addHandleSearch(controlSearchResults);
}

init();
