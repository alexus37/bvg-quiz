import React, { useState } from "react";
import data from "./networkData.js";
import BVGMap from "./BVGMap.js";
import InitGameView from "./initGameView";
import Points from "./points";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const sampleAndRemove = (stationList) => {
  const index = Math.floor(stationList.length * Math.random());
  stationList.splice(index, 1);
  return {
    sample: stationList[index],
    newStationList: stationList,
  };
};

function Game() {
  const [allStations, setAllStations] = useState([]);
  const [currentStation, setCurrentStation] = useState();

  const [gameState, setGameState] = useState("init");
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

  const initCallback = ({ mode, playerCnt }) => {
    const filteredList = Object.values(data.stations).filter(
      (station) => station.zone === undefined || station.zone === mode
    );
    const { sample, newStationList } = sampleAndRemove(filteredList);

    setAllStations(newStationList);
    setCurrentStation(sample);
    setGameState("playing");
  };

  if (gameState === "init") {
    window.screen.orientation.unlock();
    return <InitGameView callback={initCallback} />;
  }
  window.screen.orientation.lock("landscape");

  return (
    <Container>
      <Row>
        <Col md={4}>
          <h5>Find the station: {currentStation.name}</h5>
          <h5>
            Points {points} / {rounds}
            <Points scores={[true, false, true, undefined, undefined]} />
          </h5>
        </Col>
        <Col md={8}>
          <BVGMap onStationClick={onStationClick} />
        </Col>
      </Row>
    </Container>
  );
}

export default Game;
