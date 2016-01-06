import d3  from 'd3'
import React, { Component } from 'react'
import ReactFauxDOM from 'react-faux-dom'

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xLabel: 0,
      yLabel: 0,
      label: '',
      activeBar: null
    };
  }

  render() {
    var styles = require('./styles.css')
    const { chartData, onBarClick } = this.props;
    const self = this

    var headings = Object.keys(chartData[0]);

    var nonNumberFields = [
      "Title",
      "Type",
      "Added On",
      "Added By",
      "Set Page-discriptors , Field: Page Name ",
      "Set Page-discriptors , Field: Page Type ",
      "Set Post_discriptors, Field: Post_Dates"
    ]

    var nonNumberHeadings = headings.filter((heading) => {return (heading.indexOf("Code") > -1) });

    var data = [];
    var totals = nonNumberHeadings.forEach((heading) => {
    var headingTotal = 0;
    chartData.forEach((record) => {
      headingTotal = headingTotal + +record[heading]
    });
    var d = {"code": heading.replace("Code: ",""), "total": headingTotal};
    data.push(d);
    data.sort((a, b) => {return d3.descending(a.total, b.total)});
    data = data.filter((recordTotal) => {return recordTotal.total > 50})
    })

    var margin = {top: 40, right: 20, bottom: 80, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

  var node = ReactFauxDOM.createElement('svg');
  var svg = d3.select(node)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d.code; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    var tip = d3.select(node).append("text")
      .attr("class", "h6")
      .attr("x", () => this.state.xLabel)
      .attr("y", () => this.state.yLabel)
      .text(() => this.state.label)
      .style("text-anchor", "end")
      .style("font-weight", "bold")

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .attr("class", "h2")
        .text("Top Issues for December 2015");

    svg.append("g")
      .attr("class", "x axis h6")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)" )

    svg.append("g")
        .attr("class", "y axis h6")
        .call(yAxis)
      .append("text")
        .attr("transform", "translate(0,-15)")
        .attr("y", 6)
        .style("text-anchor", "end")
        .text("Posts");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.code); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.total); })
        .attr("height", function(d) { return height - y(d.total); })
        .on('click', d => {onBarClick(d.code)})
        .on('mouseover', d => self.setState({
          xLabel: x(d.code) + margin.left + 20,
          yLabel: y(d.total) + margin.top - 5,
          label: d.total
        }))

    return node.toReact()

  }
}