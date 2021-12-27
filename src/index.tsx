import React from "react";
import ReactDOM from "react-dom";
import Button from "./button";
import print from "./print";

export default function App() {
  return (
    <div className="">
      <h1>Dashboard</h1>
      <Button />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
