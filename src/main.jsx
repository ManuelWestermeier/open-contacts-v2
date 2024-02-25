import Client from "../../WSNET_Framework/_client/index.js";
import LoadingPage from "./pages/loading-page.jsx";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React, { useState } from "react";
import NavBar from "./comp/nav-bar";
import App from "./App.jsx";
import "./index.css";
//create the api conection
window.API = new Client(apiurl);
//deine the user and password global
window.user = localStorage.getItem(projectID + "-user") || false;
window.password = localStorage.getItem(projectID + "-password") || false;
//handle close
API.onclose = () => window.location.reload();
API.onerror = () => window.location.reload();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <NavBar />
      <Main />
    </HashRouter>
  </React.StrictMode>
);

var isOpen = false,
  setIsOpen = () => false;

//auth
API.onopen = async () => {
  //create user
  if (!user || !password) {
    //get username an password
    const data = await API.get(
      "create_new_user",
      prompt("input your nickname")
    );
    //if the data is false reload
    if (!data) window.location.reload();
    //split user and password
    window.user = data.u;
    window.password = data.p;
    //stroe them
    localStorage.setItem(projectID + "-user", user);
    localStorage.setItem(projectID + "-password", password);
  }

  //check if the user is auth
  if (await API.get("auth", { u: user, p: password })) {
    //set the loadingstate to false
    setIsOpen(true);
    isOpen = true;
  } else {
    //if the user dont exist
    if (!confirm("create a new user")) return;
    localStorage.removeItem(projectID + "-user");
    window.location.reload();
  }
};

//render the app or the loading
function Main() {
  [isOpen, setIsOpen] = useState(isOpen);
  return isOpen ? <App /> : <LoadingPage />;
}
