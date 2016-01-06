// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_DATA = 'LOAD_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export function loadData(chartData) {
	return {
		type: LOAD_DATA,
		payload: chartData
	}
}

export const actions = {
  loadData
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function chartData(state = [{code: 'Test', total: 100}], action) {
  switch (action.type) {
    case LOAD_DATA:
      return action.payload
    default:
      return state
  }
}