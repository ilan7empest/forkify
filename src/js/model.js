// import controller from './controller';
import { AJAX } from './helpers';

const state = {
  recipe: {},
  search: {},
  bookmarks: [],
};

const populateRecipe = (data = {}) => {
  return Object.assign(state.recipe, data);
};

const loadRecipe = async id => {
  try {
    const { data } = await AJAX(id);
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
    console.error(err.message);
  }
};

export { state, loadRecipe };

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
