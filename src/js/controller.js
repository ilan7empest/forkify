// import icons from '../img/icons.svg';
// 3rd Party
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//Moudles
import { loadRecipe, state } from './model';
import { recipeView } from '../views/recipeView';
import * as Spinner from '../views/Spinner';

// Style + assests
import icons from 'url:../img/icons.svg';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const BaseURL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

const fetchData = async () => {
  Spinner.start(recipeContainer);
  try {
    const response = await fetch(BaseURL + `/5ed6604591c37cdc054bc886`);
    let data = await response.json();
    if (!response.ok) throw new Error(data.message);

    let { recipe } = data.data;
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
    loadRecipe(recipe);
    Spinner.remove(recipeContainer);

    // recipeView(recipeContainer, recipe);

    // const message = recipeContainer.querySelector('.message');

    // recipe
    //   ? (message.style.display = 'none')
    //   : (message.style.display = 'block');
  } catch (err) {
    console.log('Error', err.message);
  }
};
fetchData();
