import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./test/Layout";
import { Login } from "./auth/Login";

function App() {
  return (
    <>

      <div className="App">
        <Layout>
          <div
          ><Login />
          </div>
        </Layout>


      </div >
    </>
  );
}

export default App;
