interface state {
  search: string
  pastSearches: Array<{
    search: string,
    responses: Array<string>
  }>
}

interface action {
  type: string
  text?: string
  data?: Array<string>
}

let initialState: state = {
  search: "",
  pastSearches: []
}

export default (state = initialState, action: action) => {
  console.info(action)
  switch (action.type) {
    case 'UPDATE_SEARCH': {
      return { ...state, search: action.text }
    }
    case 'SEARCH_SUCCEEDED': {
      return { ...state, pastSearches: action.data }
    }
  }
  return state
}
