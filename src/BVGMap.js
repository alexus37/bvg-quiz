import React, { useEffect } from "react";
import panzoom from "panzoom";
import "./App.css";

import data from "./networkData.js";

function BVGMap({ onStationClick }) {
  const width = 1120;
  const height = 765;

  const renderStations = () => {
    const r = [];
    for (let id of Object.keys(data.stations)) {
      const station = data.stations[id];
      let cls = "station " + station.lines.join(" ");
      if (station.wifi) cls += " wifi";
      if (station.interchange) cls += " interchange";

      r.push(
        <path
          //onClick={() => alert(`${id}: ${station.name}`)}
          onClick={() => onStationClick(station)}
          key={`station-${id}`}
          id={`station-${id}`}
          dataid={id}
          className={cls}
          d={station.shape}
        />
      );
    }
    return r;
  };

  const renderLines = () => {
    const r = [];
    for (let id of Object.keys(data.lines)) {
      const line = data.lines[id];

      r.push(
        <path
          key={`line-${id}`}
          id={`line-${id}`}
          dataid={id}
          className={`line ${id}`}
          d={line.shape}
        />
      );
    }
    return r;
  };
  const renderLabels = () => {
    const r = [];
    for (let id of Object.keys(data.labels)) {
      const label = data.labels[id];
      for (let position of label.positions) {
        const [x, y] = position;
        r.push(
          <g
            key={`key label-${id}-${x}-${y}`}
            transform={`translate(${x}, ${y})`}
          >
            <path
              key={`path 2 label-${id}`}
              id={`path 2 label-${id}`}
              fill={label.bg}
              d={label.body}
            />
            {label.caption.map((part, i) => {
              return (
                <path
                  key={`path ${i} label-${id}`}
                  id={`path ${i} label-${id}`}
                  fill="#fff"
                  d={part}
                />
              );
            })}
          </g>
        );
      }
    }
    return r;
  };

  useEffect(() => {
    var element = document.getElementById("bvgMap");
    panzoom(element, {
      onTouch: function (e) {
        // `e` - is current touch event.

        return false; // tells the library to not preventDefault.
      },
    }).moveTo(
      -225, // initial x position
      -200
    );
  });

  return (
    <svg
      id="bvgMap"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <g id="lines">{renderLines()}</g>
      <g id="stations">{renderStations()}</g>
      <g id="labels">{renderLabels()}</g>
    </svg>
  );
}

export default BVGMap;
