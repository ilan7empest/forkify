// import icons from '../img/icons.svg';
// 3rd Party
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//Moudles
//Model
import * as model from './model';
//View
import recipeView from '../views/recipeView';

// https://forkify-api.herokuapp.com/v2

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
    console.log(recipeView);

    // const message = recipeContainer.querySelector('.message');

    // recipe
    //   ? (message.style.display = 'none')
    //   : (message.style.display = 'block');
  } catch (err) {
    recipeView.renderError(err, 'sucsess');
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
};

init();
