import * as model from './model';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import recipeView from '../views/recipeView';
import searchView from '../views/searchView';
import resultsView from '../views/resultsView';
import pagination from '../views/paginationView';
import bookmarkView from '../views/bookmarkView';
import addRecipeView from '../views/addRecipeView';

// https://forkify-api.herokuapp.com/api/v2/recipes

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // update results view with selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.error();
    console.log(err);
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
    resultsView.render(model.getSearchResultsPage());
    pagination.render(model.state.search);
  } catch (err) {
    resultsView.error(err);
  }
};

const controlPagination = page => {
  resultsView.render(model.getSearchResultsPage(page));
  pagination.render(model.state.search);
};

const controlServings = newServings => {
  // update recipe servings in state
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  const existingBookmark = model.state.recipe.bookmarked;
  if (!existingBookmark) {
    model.addToBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const renderBookmarks = () => {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async data => {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(data);

    recipeView.render(model.state.recipe);

    bookmarkView.render(model.state.bookmarks);

    addRecipeView.success();
    setTimeout(() => {
      addRecipeView.toogleModal();
      history.pushState(
        {},
        model.state.recipe.title,
        `#${model.state.recipe.id}`
      );
    }, 2000);
  } catch (err) {
    addRecipeView.error(err);
  }
};

function init() {
  bookmarkView.addHandlerBookmarks(renderBookmarks);
  recipeView.addHandleRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);

  searchView.addHandleSearch(controlSearchResults);
  pagination.addHandlerPaginate(controlPagination);

  recipeView.addHandlerAddBookmark(controlAddBookmark);

  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();
