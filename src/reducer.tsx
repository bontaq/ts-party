import * as R from 'ramda';
import { Patient, Appointment, UserAction, PatientPage } from './models';
import { sortByDateAsc } from './util';


interface state {
  search: string
  displayResults: Array<{ url: string }>
  pastSearches: Array<{
    search: string,
    responses: Array<{ url: string }>
  }>

  // used by the patient list page
  patients: Array<Patient>

  // used by the patient detail view
  patient?: PatientPage
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

let initialState: state = {
  search: "",
  // the idea of using only pastSearches and saying the
  // currently displayed gifs were the head, or latest, of
  // pastSearches was cute, but it gets awkward with showing
  // trending (or if we wanted to continue expanding this
  // application) -- hence, displayedResults
  displayResults: [],
  pastSearches: [],
  patients: [],
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
    case 'FETCH_PATIENT_SUCCEEDED': {
      console.info(action)
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
    //    case 'UPDATE_SEARCH': {
    //      return { ...state, search: action.text }
    //    }
    //    case 'TRENDING_SUCCEEDED': {
    //      const displayResults = action.responses
    //      return {
    //        ...state,
    //        displayResults
    //      }
    //    }
    //    case 'SEARCH_SUCCEEDED': {
    //      const search = {
    //        responses: action.responses,
    //        search: action.search
    //      }
    //      const pastSearches = R.prepend(
    //        search,
    //        state.pastSearches)
    //      console.info(search)
    //      const displayResults = action.responses
    //      return {
    //        ...state,
    //        search: action.search,
    //        pastSearches,
    //        displayResults
    //      }
    //    }
  }
  return state
}
