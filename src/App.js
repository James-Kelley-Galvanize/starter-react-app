import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
const url = process.env.REACT_APP_API_URL || `localhost:8080/`;

function App() {
  const [apiDependantState, setApiDependantState] = useState({
    message: `NO API CONNECTION LOADED YET`,
  });
  const [dbDependantState, setDbDependantState] = useState({
    message: `NO DB DATA RETRIEVED FROM API YET`,
  });
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setApiDependantState(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    fetch(`${url}cats`)
      .then((res) => res.json())
      .then((data) => {
        setDbDependantState(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [apiDependantState]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Experimental Cyclic Client</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1> API CONNECTION INFO </h1>
          {JSON.stringify(apiDependantState)}
          <h1> DB FUNCTION INFO </h1>
          {JSON.stringify(dbDependantState)}
        </a>
      </header>
    </div>
  );
}

export default App;
