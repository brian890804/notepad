import React from "react";
import './App.css';
import Layout from "./Auth/layout";
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import Table from "./Table"
import CardControl from './CardControl';
import TestGameList from './test/TestGameList';
import SimpleFade from "./test/T"
function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CardControl} />       
          <Route exact path="/a" component={Table}/>
          <Route exact path="/b" component={TestGameList} />
          <Route exact path="/c" component={SimpleFade} />
        </Switch>
      </BrowserRouter>
    </Layout>


  );
}

export default App;
