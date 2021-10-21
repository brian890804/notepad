import React from "react";
import logo from './logo.svg';
import Contrainer from "@material-ui/core/Container";
import { Table1 } from "./table";
import { Table2 } from "./table2";
import './App.css';
import { AC } from './ReadComfile';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./layout";
import ab from "./Buttoncheckacount";
import InputGender from "./selectCheck";
import { ValidationSchemaCard } from "./yup/ValidationSchemaCard"
import CardControl from './CardControl.js';
import TablesMember from "./TablesMember";
export default function App() {
    return (
        <Contrainer>
            <Layout>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Table1} />
                        <Route exact path="/second" component={Table2} />
                        <Route exact path="/ReadComfile" component={AC} />
                        <Route exact path="/test" component={ab}/>
                        <Route exact path="/test1" component={InputGender} />
                        <Route exact path="/Sigin" component={ValidationSchemaCard} />
                        <Route exact path="/Buycart" component={CardControl} />
                        <Route exact path="/Tables" component={TablesMember} />
                    </Switch>

                </BrowserRouter>
            </Layout>
        </Contrainer>
    );
}