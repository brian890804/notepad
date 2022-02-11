import React, { useEffect, useState } from "react"
import { Provider } from "react-redux";
import './App.css';
import "./Member/CSS/HyperText.css"
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Routes from "./Routes"
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Aiv from "./Video/Aiv"
import { PersistGate } from "redux-persist/integration/react";
function App({ store, persistor }) {
  const [videoControl, setVideoControl] = useState(false);
  useEffect(() => {
    setTimeout(() => setVideoControl(false), 3000)
  }, [])

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}> {/*數據持久化*/}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {videoControl ? <Aiv /> :
              <Router>
                <Routes />
              </Router>
            }
          </MuiPickersUtilsProvider>
        </PersistGate>

      </Provider>
    </>
  );
}

export default App;
