import * as request from 'superagent';

const API_ROOT = 'https://eden-interview-api.herokuapp.com'
//const API_ROOT = 'http://api.giphy.com/v1/gifs';
const API_KEY = 'lZ5kagBcJVFoUrpnDE9WkpByBKLRoiuX';
const NUM_RESULTS = 1;

export async function patients() {
  return request.get(`${API_ROOT}/patients`);
}

export async function patient(id: number) {
  return request.get(`${API_ROOT}/patients/${id}`);
}

export async function appointmentsByPatient(id: number) {
  return request.get(`${API_ROOT}/appointments?patient_id=${id}`)
}

export async function userActionsByPatient(id: number) {
  return request.get(`${API_ROOT}/user_actions?patient_id=${id}`)
}

export async function trending() {
  return request.get(`${API_ROOT}/trending?api_key=${API_KEY}&limit=${NUM_RESULTS}`)
}

export async function search(term: string) {
  return request.get(`${API_ROOT}/search?api_key=${API_KEY}&q=${term}&limit=${NUM_RESULTS}`)
}
