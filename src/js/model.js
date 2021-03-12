// import controller from './controller';
import { AJAX } from './helpers';

const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
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

/*const paginate = followers => {
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(followers.length / itemsPerPage);

  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return followers.slice(start, start + itemsPerPage);
  });

  return newFollowers;
};*/

const pagination = (page = state.search.page, itemsPerPage = 10) => {
  state.search.page = page;
  const { results } = state.search;
  const pages = Math.ceil(results.length / itemsPerPage);

  let newResults = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;
    return results.slice(start, start + itemsPerPage);
  });

  return newResults[page - 1];
};

export { state, loadRecipe, loadSearchResults, pagination };

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
