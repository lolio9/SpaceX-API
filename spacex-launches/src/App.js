import React from "react";
import LaunchList from "./LaunchList";
import LaunchChart from "./LaunchChart";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="left">
        <h1>SpaceX Oppskytinger</h1>
        <LaunchList />
      </div>
      <div className="right">
        <LaunchChart />
      </div>
    </div>
  );
}

export default App;
