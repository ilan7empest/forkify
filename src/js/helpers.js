import { TIMEOUT_SEC } from './constants';
const BaseURL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async (params = '', method = 'GET') => {
  try {
    const response = await Promise.race([
      fetch(`${BaseURL}/${params}`, { method }),
      timeout(TIMEOUT_SEC),
    ]);

    data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    throw err;
  }
};
