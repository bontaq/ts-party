interface state {
  search: string
}

interface action {
  type: string
  text?: string
}

let initialState: state = {
  search: ""
}

export default (state = initialState, action: action) => {
  console.info(action)
  console.info(state)
  switch (action.type) {
    case 'UPDATE_SEARCH': {
      return { ...state, search: action.text }
    }
  }
  return state
}
