import { TIMEOUT_SEC } from './constants';

const timeout = sec => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('TO MUCH TIME PASSED'));
    }, sec * 1000);
  });
};

const BASE_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';

export const AJAX = async (params, body) => {
  try {
    const fetchData = body
      ? fetch(BASE_URL + params, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      : fetch(BASE_URL + params);

    const response = await Promise.race([fetchData, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return data.data;
  } catch (err) {
    throw err;
  }
};
