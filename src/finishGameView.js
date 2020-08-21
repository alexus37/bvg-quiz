import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Trophy } from "react-bootstrap-icons";
import { Heart } from "react-bootstrap-icons";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const playerNames = {
  player_0: "Player 1",
  player_1: "Player 2",
};

function FinishGameView({ points, callback }) {
  const realPoints = {};
  Object.keys(points).forEach((player) => {
    realPoints[player] = points[player].filter((point) => point).length;
  });
  const realValueList = Object.values(realPoints);
  const tie =
    realValueList.every((value) => value === realValueList[0]) &&
    realValueList.length > 1;

  const winnerIndex = realValueList.indexOf(Math.max(...realValueList));

  const winner = `player_${winnerIndex}`;
  const { width, height } = useWindowSize();
  return (
    <div className="background">
      <Confetti width={width} height={height} />
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {tie ? (
                <h1>That was a tie!</h1>
              ) : (
                <h1>The Winner is {playerNames[winner]}</h1>
              )}
              <Trophy color="royalblue" size={96} />
              <Button
                variant="success"
                onClick={() => callback()}
                style={{ marginTop: 20 }}
              >
                Play again?
              </Button>
              <div style={{ marginTop: 20, display: "flex" }}>
                <p>made by Lea and Alex with </p>
                <Heart color="red" style={{ marginTop: 5, marginLeft: 5 }} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FinishGameView;
