import { TIMEOUT_SEC } from './constants';

const timeout = sec => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('TO MUCH TIME PASSED'));
    }, sec * 1000);
  });
};

const BASE_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';

export const AJAX = async (params, method, body) => {
  try {
    const response = await Promise.race([
      fetch(BASE_URL + params, {
        method,
        body,
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return data.data;
  } catch (err) {
    throw err;
  }
};
