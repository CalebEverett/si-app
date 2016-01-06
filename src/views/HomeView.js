import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as chartDataActions } from '../redux/modules/chartData'
import { actions as filterActions } from '../redux/modules/filter'
import styles from './HomeView.scss'
import Chart from 'components/Chart/Chart'
import Table from 'components/Table/Table'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter,
  chartData: state.chartData,
  filter: state.filter,
  tableData: state.filter === null ? [] : state.chartData.filter((record) => { return record["Code: " + state.filter] == 1 })
})
export class HomeView extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    chartData: React.PropTypes.array,
    loadData: React.PropTypes.func.isRequired,
    setFilter: React.PropTypes.func.isRequired,
    clearFilter: React.PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.loadData(require('components/Chart/Media_2015_12_31_1918.csv'))
  }

  render () {
    const { chartData, setFilter, clearFilter, filter, tableData } = this.props
    return (
      <div className='container text-center'>
        <h1>Welcome to the Sample Si App</h1>
        <Chart chartData={chartData} onBarClick={(filter) => {setFilter(filter)}} />
        <Table tableData={tableData} filter={filter}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, Object.assign(chartDataActions, filterActions))(HomeView)
