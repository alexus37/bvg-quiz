import React, { useState } from "react";
import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FinishGameView({ points }) {
  const realPoints = {};
  Object.keys(points).map((player) => {
    realPoints[player] = points[player].filter((point) => point).length;
  });
  const realValueList = Object.values(realPoints);
  const tie = realValueList.every((value) => value === realValueList[0]);

  const winnerIndex = realValueList.indexOf(Math.max(...realValueList));

  const winner = `player_${winnerIndex}`;

  return (
    <div className="background">
      <Container>
        <Row>
          <Col md={6}>
            {tie ? <h1>That was a tie!</h1> : <h1>The Winner is {winner}</h1>}
          </Col>
          <Col md={6}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default FinishGameView;
