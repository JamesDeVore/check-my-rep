import React, { useEffect } from "react";
import * as d3 from "d3";

export default function PieChart(props) {
  useEffect(() => {
    let {data} = props;
    var svg = d3.select("#" + props.htmlId.toString()),
      width = svg.attr("width"),
      height = svg.attr("height"),
      radius = Math.min(width, height) / 2,
      g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
    console.log(props)
    var color = d3.scaleOrdinal()
      .range([props.colors.opposing, props.colors.main, "#d69e2e"]);

    // Generate the pie
    var pie = d3.pie();

    // Generate the arcs
    var arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    //Generate groups
    var arcs = g
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    //Draw arc paths
    arcs
      .append("path")
      .attr("fill", function(d, i) {
        return color(i);
      })
      .attr("d", arc);
  }, []);

  return <svg width="60" height="60" id={props.htmlId}>{props.id}</svg>;
}
