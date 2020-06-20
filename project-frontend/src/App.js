import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from  "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import  HomePage from "./components/homepage.component";
import  EditPage from "./components/edit.component";
import  NameFinder from "./components/name.finder.component";

import  DisplayPage from "./components/display.component";
import  FetchNames from "./components/fetchNames";
import Fnames from "./components/fnames";
import Snames from "./components/snames";


import logo from "./logo.png";


class App extends Component {
  render() {
      return (
        <Router>
         <div className= "container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <a className="navbar-brand" href="https://google.com" target="_blank">
              <img src = {logo} width="30" height="30" alt="Soundex Project" />
            </a>
            <Link to="/" className="navbar-brand"> Name Encoder</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Home Page </Link>
                </li>

                <li className="navbar-item">
                  <Link to="/nameFinder" className="nav-link">Name Finder </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className = "App">
           <div className = "App-Component">
           <div className = "App-Component">
           <EditPage snames={Snames} fnames={Fnames}/>


           </div>
           </div>
          </div>

          <Route path="/edit/:id" component={EditPage} />
          <Route path="/nameFinder" component={NameFinder} />

        </div>



        </Router>

    );
  }
}

export default App;
