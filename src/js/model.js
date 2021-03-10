import controller from './controller';

export const state = {
  recipe: {},
  search: {},
  bookmarks: [],
};

const loadRecipe = (data = {}) => {
  return Object.assign(state.recipe, data);
};

export { loadRecipe };
