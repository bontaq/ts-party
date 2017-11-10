interface state {
  search: string
}

interface action {

}

let initialState: state = {
  search: "wubwub"
}

export default (state = initialState, action: action) => {
  return state
}
