import React, { useState } from "react";
import data from "./networkData.js";
import BVGMap from "./BVGMap.js";
import InitGameView from "./initGameView";
import Points from "./points";
import FinishGameView from "./finishGameView";

const GAME_ROUNDS = 5;
const playerNames = {
  player_0: "Player 1",
  player_1: "Player 2",
};

const sampleAndRemove = (stationList) => {
  const index = Math.floor(stationList.length * Math.random());
  const sample = stationList[index];
  stationList.splice(index, 1);
  return {
    sample,
    newStationList: stationList,
  };
};

function Game() {
  const [allStations, setAllStations] = useState([]);
  const [currentStation, setCurrentStation] = useState();
  const [lastStation, setLastStation] = useState();

  const [gameState, setGameState] = useState("init");
  const [points, setPoints] = useState({});
  const [rounds, setRounds] = useState(0);
  const [nrPlayers, setNrPlayers] = useState(0);

  const onStationClick = (station) => {
    const newPoints = { ...points };
    const roundResult = station.name === currentStation.name;
    const playerIndex = rounds % nrPlayers;
    const roundIndex = Math.floor(rounds / nrPlayers);

    newPoints[`player_${playerIndex}`][roundIndex] = roundResult;
    setPoints(newPoints);

    if (rounds + 1 === GAME_ROUNDS * nrPlayers) {
      setTimeout(() => setGameState("finish"), 1000);
    } else {
      setRounds(rounds + 1);
      const { sample, newStationList } = sampleAndRemove(allStations);
      roundResult ? setLastStation(undefined) : setLastStation(currentStation);
      setCurrentStation(sample);
      setAllStations(newStationList);
    }
  };

  const initCallback = ({ mode, playerCnt }) => {
    const filteredList = Object.values(data.stations).filter((station) =>
      mode.includes(station.zone)
    );
    const { sample, newStationList } = sampleAndRemove(filteredList);

    setAllStations(newStationList);
    setCurrentStation(sample);

    let newPoints = {};
    for (var i = 0; i < playerCnt; i++) {
      newPoints[`player_${i}`] = new Array(GAME_ROUNDS).fill(undefined);
    }
    console.log(newPoints);
    setPoints(newPoints);
    setRounds(0);
    setNrPlayers(playerCnt);
    setGameState("playing");
  };

  const resetCallback = () => setGameState("init");

  if (gameState === "init") {
    return <InitGameView callback={initCallback} />;
  }

  if (gameState === "finish") {
    return <FinishGameView callback={resetCallback} points={points} />;
  }

  return (
    <div style={{ marginLeft: 15 }}>
      <div style={{ display: "flex" }}>
        <div md={4} className="gameStats">
          <h5>Find the station:</h5>
          <h6>{currentStation.name}</h6>
          {Object.keys(points).map((player) => {
            return (
              <div key={`${player}_div`}>
                <h5 key={player}>{playerNames[player]}</h5>
                <Points
                  key={`${player}_points`}
                  pkey={`${player}_points`}
                  scores={points[player]}
                />
              </div>
            );
          })}
        </div>
        <div md={8} className="gameField">
          <BVGMap onStationClick={onStationClick} lastStation={lastStation} />
        </div>
      </div>
    </div>
  );
}

export default Game;
