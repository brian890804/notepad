
import './App.css';
import {Sigin} from "./sigin";
import Layout from "./auth/layout";

function App() {
  return (
    <div className="App">
        <Layout>
          <Sigin/>
        </Layout>
    </div>
  );
}

export default App;
