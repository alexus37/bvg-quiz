import React from "react";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";

function Points({ scores, pkey }) {
  return (
    <Row>
      <Col>
        {scores.map((score, i) => {
          if (score === undefined) {
            return <div key={`${pkey}_${i}`} className="dot toBePlayed" />;
          }
          return (
            <div
              key={`${pkey}_${i}`}
              className={score ? "dot win" : "dot loose"}
            />
          );
        })}
      </Col>
    </Row>
  );
}

export default Points;
