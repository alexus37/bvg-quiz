import React, { useEffect } from "react";
import panzoom from "panzoom";
import "./App.css";

import data from "./networkData.js";

function BVGMap({ onStationClick, lastStation }) {
  const width = 1120;
  const height = 765;

  const renderStations = () => {
    const r = [];
    for (let id of Object.keys(data.stations)) {
      const station = data.stations[id];
      let cls = "station " + station.lines.join(" ");
      if (station.wifi) cls += " wifi";
      if (station.interchange) cls += " interchange";
      if (lastStation && station.name === lastStation.name)
        cls += " lastStation";

      r.push(
        <path
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

  const getStartPointFromShape = (shape) => {
    let x = 0;
    let y = 0;
    const splitShape = shape.split(" ");
    if (splitShape.length > 1) {
      x = parseFloat(splitShape[0].substring(1));
      const str = splitShape[1].toLowerCase();
      let index = -1;
      for (var i = 0; i < str.length; i++) {
        if (
          str[i] === "m" ||
          str[i] === "l" ||
          str[i] === "v" ||
          str[i] === "h" ||
          str[i] === "c" ||
          str[i] === "s" ||
          str[i] === "t" ||
          str[i] === "a" ||
          str[i] === "z"
        ) {
          index = i;
          break;
        }
      }
      y = parseFloat(str.substring(0, index));
    } else {
      console.log("error shape could not be split");
    }
    return [x, y];
  };

  const renderStationsClickCircles = () => {
    const r = [];
    for (let id of Object.keys(data.stations)) {
      const station = data.stations[id];
      const [x, y] = getStartPointFromShape(station.shape);

      r.push(
        <circle
          onClick={() => onStationClick(station)}
          key={`circle-station-${id}`}
          id={`circle-station-${id}`}
          dataid={id}
          cx={x}
          cy={y}
          r="7"
          strokeWidth="0"
          fillOpacity="0"
          fill="red"
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
  let x = 0;
  let y = 0;
  if (lastStation) {
    [x, y] = getStartPointFromShape(lastStation.shape);
  }

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
      {lastStation && (
        <text x={x} y={y} className="small">
          {lastStation.name}
        </text>
      )}
      <g id="clickCircles">{renderStationsClickCircles()}</g>
    </svg>
  );
}

export default BVGMap;
