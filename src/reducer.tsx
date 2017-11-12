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
  switch (action.type) {
    case 'UPDATE_SEARCH': {
      state.search = action.text
      return state
    }
  }
  return state
}
