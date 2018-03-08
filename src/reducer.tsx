import * as R from 'ramda';
import { Patient, Appointment, UserAction, PatientPage } from './models';
import { sortByDateAsc } from './util';


export interface State {
  // used by the patient list page
  patients: Array<Patient>

  // used by the patient detail view
  patient?: PatientPage

  // used by the appointments page
  appointments: Array<Appointment>
}

// this is a bit janky, is there a better way
// to type actions?  I'd guess a union but hmm
interface action {
  type: string
  patients?: Array<Patient>
  patient?: Patient
  appointments?: Array<Appointment>
  userActions?: Array<UserAction>
}

let initialState: State = {
  patients: [],
  appointments: [],
  patient: undefined
}

export default (state = initialState, action: action) => {
  switch (action.type) {
    case 'FETCH_PATIENTS_SUCCEEDED': {
      return {
        ...state,
        patients: action.patients
      };
    }
    case 'FETCH_APPOINTMENTS_SUCCEEDED': {
      return {
        ...state,
        appointments: action.appointments
      }
    }
    case 'FETCH_PATIENT_SUCCEEDED': {
      // recombine into our representation of patient,
      const appointments = action.appointments || [];
      const sortedAppointments = sortByDateAsc('datetime', appointments);

      return {
        ...state,
        patient: {
          ...action.patient,
          appointments: (sortedAppointments || []),
          userActions: (action.userActions || []),
        }
      }
    }
    // necessary to avoid a flash of the last patient
    case 'CLEAR_PATIENT': {
      return {
        ...state,
        patient: undefined
      }
    }
  }
  return state
}
