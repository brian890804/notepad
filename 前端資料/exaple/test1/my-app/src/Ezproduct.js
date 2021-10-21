import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { ButtonAddControl } from "./ButtonAddContorl"

import { Card, CardImg, CardTitle, CardSubtitle, CardText, Badge } from 'reactstrap';
export function Ezproduct({submit}) {
  return (
    <div className="App m-5">
      <CardImg
        src="https://i1.kknews.cc/SIG=pv502v/ctp-vzntr/o0s702254rq14s61n948q8o2369nq0qs.jpg" alt="test" draggable="false" />
      <Card className="pb-3">
        <CardTitle><h1><b>海綿寶寶</b></h1></CardTitle>
        <CardSubtitle>
          <h2><Badge color="success">售價:1580</Badge></h2>
        </CardSubtitle>
        <CardText><h2>GameBot</h2></CardText>
        <ButtonAddControl submit={submit}/>
        
      </Card>
    </div>
  );
}

export default Ezproduct;