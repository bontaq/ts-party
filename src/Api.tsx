import * as request from 'superagent';


const API_ROOT = 'http://api.giphy.com/v1/gifs';
const API_KEY = 'lZ5kagBcJVFoUrpnDE9WkpByBKLRoiuX';

export async function trending() {
  return request.get(`${API_ROOT}/trending?api_key=${API_KEY}`)
}
