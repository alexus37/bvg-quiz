import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Person } from "react-bootstrap-icons";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function InitGameView({ callback }) {
  const [mode, setMode] = useState("A");
  const [playerCnt, setPlayerCnt] = useState(1);
  return (
    <div className="background">
      <Container>
        <Row>
          <Col md={6}>
            <h1>BVGler</h1>
            <h6>Ick bin ein BVGler!</h6>
            <p>
              Do you know your city? Test your knowledge about all the S- and
              U-Bahn stations of Berlin! After clicking START, you will be given
              a station name and you have to pin it on the BVG map. By coosing a
              mode, you can set your difficulty level. Either you play by
              yourself or you challenge your friends. Have Fun!
            </p>
          </Col>
          <Col md={6}>
            <h2>Mode</h2>
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="success"
                active={mode === "A"}
                onClick={() => setMode("A")}
              >
                A
              </Button>
              <Button
                variant="warning"
                active={mode === "AB"}
                onClick={() => setMode("AB")}
              >
                AB
              </Button>
              <Button
                variant="danger"
                active={mode === "ABC"}
                onClick={() => setMode("ABC")}
              >
                ABC
              </Button>
            </ButtonGroup>
            <h2>Player</h2>
            <ButtonGroup>
              <Button active={playerCnt === 1} onClick={() => setPlayerCnt(1)}>
                <Person />
              </Button>
              <Button active={playerCnt === 2} onClick={() => setPlayerCnt(2)}>
                <Person />
                <Person />
              </Button>
            </ButtonGroup>
            <div style={{ marginTop: 20 }}>
              <Button
                variant="primary"
                style={{ width: "100%" }}
                onClick={() => {
                  let finalMode = [];
                  if (mode === "A") {
                    finalMode = ["A"];
                  }
                  if (mode === "AB") {
                    finalMode = ["A", "AB"];
                  }
                  if (mode === "ABC") {
                    finalMode = ["A", "AB", "ABC"];
                  }
                  callback({ mode: finalMode, playerCnt });
                }}
              >
                START
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default InitGameView;
