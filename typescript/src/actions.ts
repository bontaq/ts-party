import { Patient } from './models';
import { put, select, take, fork, takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import * as R from 'ramda';
import * as Api from './api';

// quick rundown of the effect calls:
// - fork -- asyncronous / non-blocking call of fn
// - select -- includes passing the state, used here to see
//             if we already have results for a search
// - takeLatest -- cancels prior calls if it was still running
// - put -- dispatches to the store for updating
// - all -- somewhat like Promise.all,
//          those these promises don't finish

export function* fetchPatients() {
  const rawResults = yield call(Api.patients)
  yield put({
    type: 'FETCH_PATIENTS_SUCCEEDED',
    patients: rawResults.body
  })
}

export function* watchPatientsRequest() {
  yield takeEvery('FETCH_PATIENTS', fetchPatients)
}

export function* fetchAppointments() {
  const rawAppts = yield call(Api.appointments)
  const patientIds = rawAppts.body.map((a: any) => a.patient_id)

  const rawPatients = yield all(patientIds.map((p: number) => call(Api.patient, p)))
  // TODO: fix these types
  const patientIdLookup: any =
    R.reduce((acc, p: { body: { id: string, name: string } }) =>
      R.assoc(p.body.id, p.body.name, acc)
      , {}, rawPatients);

  const apptsWithName = R.map((appt: any) =>
    R.assoc('patient_name', R.prop(appt.patient_id, patientIdLookup), appt)
  )(rawAppts.body)

  yield put({
    type: 'FETCH_APPOINTMENTS_SUCCEEDED',
    appointments: apptsWithName
  })
}

export function* watchAppointmentsRequest() {
  yield takeEvery('FETCH_APPOINTMENTS', fetchAppointments)
}

export function* fetchPatient(id: number) {
  // run in parallel
  const [patient, appointments, userActions] = yield all([
    call(Api.patient, id),
    call(Api.appointmentsByPatient, id),
    call(Api.userActionsByPatient, id)
  ]);
  yield put({
    type: 'FETCH_PATIENT_SUCCEEDED',
    patient: patient.body,
    appointments: appointments.body,
    userActions: userActions.body
  })
}

export function* watchPatientRequest() {
  while (true) {
    const { id } = yield take('FETCH_PATIENT')
    yield fork(fetchPatient, id)
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchPatientsRequest),
    fork(watchAppointmentsRequest),
    fork(watchPatientRequest),
  ])
}
