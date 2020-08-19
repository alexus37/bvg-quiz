import React from "react";
import ReactGA from "react-ga";
import Game from "./game.js";
import "bootstrap/dist/css/bootstrap.min.css";

const trackingId = "UA-152068498-1";
ReactGA.initialize(trackingId);

function App() {
  return <Game />;
}

export default App;
