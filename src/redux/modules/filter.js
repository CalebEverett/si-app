// ------------------------------------
// Constants
// ------------------------------------
export const SET_FILTER = 'SET_FILTER'
export const CLEAR_FILTER = 'CLEAR_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export function setFilter(filter) {
	return {
		type: SET_FILTER,
		payload: filter
	}
}
export function clearFilter() {
  return {
    type: CLEAR_FILTER,
    payload: null
  }
}

export const actions = {
  setFilter,
  clearFilter
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function filter(state = null, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.payload
    case CLEAR_FILTER:
      return action.payload
    default:
      return state
  }
}