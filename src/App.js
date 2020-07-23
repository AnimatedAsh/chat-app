import React from "react";
import "./App.css";
import AppNavbar from "./components/layout/AppNavbar";
import { Switch, Route } from "react-router";
import DashBoard from "./components/dashboard/DashBoard";

function App() {
  return (
    <React.Fragment>
      <main className="container-fluid">
        <AppNavbar />
        <div className="content container">
          <Switch>
            <Route path="/chat/:id" exact component={DashBoard} />
          </Switch>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
