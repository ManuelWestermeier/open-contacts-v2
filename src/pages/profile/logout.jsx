import { useState } from "react";
import { Link } from "react-router-dom";

var isLoggedOut = false, setIsLoggedOut = () => false;

export function logout() {
  localStorage.removeItem(projectID + "-user")
  localStorage.removeItem(projectID + "-password")

  var auth_blob = new Blob([`last auth data on ${location.href}\nuser : ${user}\npassword : ${password}`], { type: "text/plain" })
  var url = URL.createObjectURL(auth_blob)

  var download_link = document.createElement("a")
  download_link.href = url
  download_link.download = `auth_data_${projectID}_${user}`
  download_link.click()

  setIsLoggedOut(true)
}

function Logout() {

  [isLoggedOut, setIsLoggedOut] = useState(false)

  return <div className="container">
    {isLoggedOut ? <>
      <h1>!!You Are log out!!</h1>
      <button className="btn btn-danger" onClick={() => {
        localStorage.setItem(projectID + "-user", user);
        localStorage.setItem(projectID + "-password", password);
        document.location.hash = "#"
        location.reload()
      }}>
        Log In
      </button>
      <button className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={() => {
        document.location.hash = "#"
        location.reload()
      }}>
        Finish
      </button>
    </> : <>
      <h1>Are you sure you want to log out of your account?</h1>
      <button className="btn btn-danger" onClick={logout}>
        Yes
      </button>
      <Link style={{ marginLeft: "10px" }} replace className="btn btn-primary" to="/">
        No
      </Link>
    </>}
  </div>;
}
export default Logout;