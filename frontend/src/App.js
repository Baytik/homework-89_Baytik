import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Header from "./Components/Header/Header";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Artists from "./Components/Artists/Artists";
import Albums from "./Components/Albums/Albums";
import Tracks from "./Components/Tracks/Tracks";
import trackHistory from "./Components/trackHistory/trackHistory";

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header/>
          <Switch>
            <Route path="/" exact component={Artists}/>
            <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/albums/:id" component={Albums}/>
              <Route path="/track/:id" component={Tracks}/>
              <Route path="/track_history" component={trackHistory}/>
          </Switch>
        </div>
    )
  }
}

export default App;