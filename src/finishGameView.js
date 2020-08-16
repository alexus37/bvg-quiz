import React from "react";
import Container from "react-bootstrap/Container";
import { Trophy } from "react-bootstrap-icons";
import Confetti from "react-confetti";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FinishGameView({ points }) {
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

  return (
    <div className="background">
      <Confetti />
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
              {tie ? <h1>That was a tie!</h1> : <h1>The Winner is {winner}</h1>}
              <Trophy color="royalblue" size={96} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FinishGameView;
