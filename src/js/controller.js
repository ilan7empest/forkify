// import icons from '../img/icons.svg';
// 3rd Party
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//Moudles
//Model
import * as model from './model';
//View
import recipeView from '../views/recipeView';
import previewView from '../views/previewView';
import searchView from '../views/searchView';

if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////

const controlRecipes = async () => {
  try {
    let id = location.hash.slice(1);
    if (!id) return;

    // Spinner.start(recipeContainer);
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.removeSpinner();

    // console.log(recipeView.constructor.name === 'RecipeView');

    recipeView.render(model.state.recipe);
    // console.log(recipeView);

    // const message = recipeContainer.querySelector('.message');

    // recipe
    //   ? (message.style.display = 'none')
    //   : (message.style.display = 'block');
  } catch (err) {
    recipeView.renderError(err, 'sucsess');
  }
};

const controlSearchResults = async () => {
  try {
    previewView.renderSpinner();

    const searchValue = searchView.getQuery();
    if (!searchValue) return;

    await model.loadSearchResults(searchValue);
    //
    previewView.removeSpinner();

    previewView.render(model.state.search.results);
  } catch (err) {
    previewView.renderError(err);
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
