import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import counter from './counter'
import chartData from './chartData'
import filter from './filter'

export default combineReducers({
  counter,
  chartData,
  filter,
  router: routeReducer
})
