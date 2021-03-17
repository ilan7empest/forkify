import { async } from 'regenerator-runtime';
import { AJAX } from './helpers';

const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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

export { loadRecipe, loadSearchResults, state };
