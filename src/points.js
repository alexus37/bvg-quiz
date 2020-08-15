import React from "react";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";

function Points({ scores }) {
  return (
    <Row>
      <Col>
        {scores.map((score) => {
          if (score === undefined) {
            return <div className="dot toBePlayed" />;
          }
          return <div className={score ? "dot win" : "dot loose"} />;
        })}
      </Col>
    </Row>
  );
}

export default Points;
