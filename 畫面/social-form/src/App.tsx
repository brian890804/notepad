import Layout from "./Component/Layout";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "./Component/AlertDialog";
import SocialForm from "./Pages/SocialForm";
import { toastAutoCloseDuring } from "./constant";
function App() {
  return (
    <Layout>
      <SocialForm />
      <ToastContainer
          className="toast_container"
          toastClassName="toast_container_item"
          position="bottom-center"
          autoClose={toastAutoCloseDuring}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AlertDialog/>
    </Layout>
  );
}

export default App;
