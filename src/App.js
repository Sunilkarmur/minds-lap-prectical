import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

//Imports Styles
import './App.css';

//Imports Component
import SearchMovie from './pages/SearchMovie';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={SearchMovie}/>
        </Switch>
      </div>
    </Router>
  );
}
