import * as request from 'superagent';

const API_ROOT = 'https://eden-interview-api.herokuapp.com'
const API_KEY = 'lZ5kagBcJVFoUrpnDE9WkpByBKLRoiuX';

export async function patients() {
  return request.get(`${API_ROOT}/patients`);
}

export async function appointments() {
  return request.get(`${API_ROOT}/appointments?_sort=datetime&_order=desc`);
}

export async function patient(id: number) {
  return request.get(`${API_ROOT}/patients/${id}`);
}

export async function appointmentsByPatient(id: number) {
  return request.get(`${API_ROOT}/appointments?patient_id=${id}`)
}

export async function userActionsByPatient(id: number) {
  return request.get(`${API_ROOT}/user_actions?patient_id=${id}&action=message`)
}
