import React, { useState } from "react";
import data from "./networkData.js";
import BVGMap from "./BVGMap.js";

function Game() {
  const sampleAndRemove = (stationList) => {
    const index = Math.floor(stationList.length * Math.random());
    stationList.splice(index, 1);
    return {
      sample: stationList[index],
      newStationList: stationList,
    };
  };
  const { sample, newStationList } = sampleAndRemove(
    Object.values(data.stations)
  );
  const [allStations, setAllStations] = useState(newStationList);

  const [currentStation, setCurrentStation] = useState(sample);
  const [points, setPoints] = useState(0);
  const [rounds, setRounds] = useState(0);
  const onStationClick = (station) => {
    if (station.name === currentStation.name) {
      setPoints(points + 1);
    }
    setRounds(rounds + 1);
    const { sample, newStationList } = sampleAndRemove(allStations);
    setCurrentStation(sample);
    setAllStations(newStationList);
  };
  return (
    <div>
      <h3>Find the station: {currentStation.name}</h3>
      <h3>
        Points {points} / {rounds}
      </h3>
      <BVGMap onStationClick={onStationClick} />
    </div>
  );
}

export default Game;
