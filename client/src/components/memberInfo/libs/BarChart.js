import React, { useEffect, useLayoutEffect } from "react";
import * as d3 from "d3";

export default function BarChart(props) {
  console.log(props);
  useLayoutEffect(() => {
    const margin = 90;
    const width = 400 - margin;
    const height = 400 - margin;
    const svg = d3.select("#" + props.svgID);

    let maxHeight = props.data
      .map(ele => ele.amount)
      .reduce((a, b) => (a > b ? a : b), 0);
    let minHeight = props.data
      .map(ele => ele.amount)
      .reduce((a, b) => (a < b ? a : b), props.data[0].amount);
    console.log(maxHeight);
    const yScale = d3
      .scaleLinear()
      .domain([0, Math.round(maxHeight)])
      .range([height, 0]);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    chart.append("g").call(d3.axisLeft(yScale));
    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(props.data.map(s => s.category))
      .padding(0.2);

    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");
    chart
      .selectAll()
      .data(props.data)
      .enter()
      .append("rect")
      .attr("class","bar")
      .attr("x", expense => xScale(expense.category))
      .attr("y", ex => yScale(ex.amount))
      .attr("height", ex => height - yScale(ex.amount))
      .attr("width", xScale.bandwidth());

    // chart
    //   .append("g")
    //   .attr("class", "grid")
    //   .call(
    //     d3
    //       .axisLeft()
    //       .scale(yScale)
    //       .tickSize(-width, 0, 0)
    //       .tickFormat("")
    //   );
      svg
        .append("text")
        .attr("class",'xAxisBar')
        .attr("x", -(height / 2) - margin)
        .attr("y", margin / 2.4)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Amount Spent");

      svg
        .append("text")
        .append("class","yAxisBar")
        .attr("x", width / 2 + margin)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .text(props.date);
  }, []);
  return (
      <svg id={props.svgID} height="600" width="600"></svg>
  );
}
