import React from "react";
import './App.css';
import { Layout } from "./Auth/Layout"
import {EditPage} from "./YellowPages/Revise/EditPage"
import Test from "./YellowPages/test/TEST"

function App() {
  return (
    <>
      <Layout>
        <EditPage/>
        {/* <Test/> */}
      </Layout>
    </>
  );
}

export default App;
