import * as R from 'ramda';


interface state {
  search: string
  displayResults: Array<{ url: string }>
  pastSearches: Array<{
    search: string,
    responses: Array<{ url: string }>
  }>
}

interface action {
  type: string
  text?: string
  data?: Array<{ url: string }>
  responses?: Array<{ url: string }>
  search?: string
}

let initialState: state = {
  search: "",
  // the idea of using only pastSearches and saying the
  // currently displayed gifs were the head, or latest, of
  // pastSearches was cute, but it gets awkward with showing
  // trending (or if we wanted to continue expanding this
  // application) -- hence, displayedResults
  displayResults: [],
  pastSearches: []
}

export default (state = initialState, action: action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH': {
      return { ...state, search: action.text }
    }
    case 'TRENDING_SUCCEEDED': {
      const displayResults = action.responses
      return {
        ...state,
        displayResults
      }
    }
    case 'SEARCH_SUCCEEDED': {
      const search = {
        responses: action.responses,
        search: action.search
      }
      const pastSearches = R.prepend(
        search,
        state.pastSearches)
      console.info(search)
      const displayResults = action.responses
      return {
        ...state,
        search: action.search,
        pastSearches,
        displayResults
      }
    }
  }
  return state
}
