import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Header from "./Components/Header/Header";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Artists from "./Components/Artists/Artists";

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header/>
          <Switch>
              <Route path="/" exact component={Artists}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
          </Switch>
        </div>
    )
  }
}

export default App;