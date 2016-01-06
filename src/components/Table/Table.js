import React, { Component } from 'react'

export default class Table extends Component {
	render(){
		const { tableData, filter } = this.props
		const tableRows = tableData.map((record, i) =>
      <tr key={i}>
	      <th scope="row">{i}</th>
      	<td>{record["Title"]}</td>
      	<td>{record["Added On"]}</td>
      	<td>{record["Set Page-discriptors , Field: Page Name "]}</td>
      	<td>{record["Set Page-discriptors , Field: Page Type "]}</td>
      	<td>{record["Set Post_discriptors, Field: #_Post_likes "]}</td>
    	</tr>
    )
    const heading = tableData.length > 0 ? <h2>{filter} Posts</h2> : ''

		return (
			<div>
			{heading}
				<table className="table text-left">
			  <thead>
			    <tr>
			      <th>No.</th>
			      <th>Title</th>
			      <th>Added On</th>
			      <th>Name</th>
			      <th>Type</th>
			      <th>Likes</th>
			    </tr>
			  </thead>
			  <tbody>
		      {tableRows}
			  </tbody>
			</table>
		</div>
		)

	}
}