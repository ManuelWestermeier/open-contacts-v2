import { useState } from "react";
import { logout } from "./logout";

function Login() {
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [_user, setUser] = useState("")
  const [_password, setPassword] = useState("")

  return (
    <div className="container">
      <h1>Login</h1>
      {loading ?
        <div className="spinner-grow" role="status">
          <span className="d-none">Loading...</span>
        </div>
        :
        <form onSubmit={async e => {
          //set loading
          setIsLoading(true)
          //check if auth
          var data = await API.get("auth", {
            u: _user || "",
            p: _password || ""
          })
          setIsLoading(false)
          if (data) {
            logout()
            localStorage.setItem(projectID + "-user", _user || "");
            localStorage.setItem(projectID + "-password", _password || "");
            setError("")
          }
          else setError("User ID or Password are wrong")
        }}>
          <div className="form-group mb-2">
            <label htmlFor="exampleInputEmail1">User ID</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={_user}
              onChange={e => setUser(e.target.value)}
              placeholder="User Id..."
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="exampleInputPassword1">User Password</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={_password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password..."
            />
          </div>
          <p style={{ color: "red" }}>{error}</p>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary" >
              Submit
            </button>
          </div>
        </form>}
      <p style={{ wordBreak: "break-all" }}>current user : {user}</p>
      <p style={{ wordBreak: "break-all" }}>current password : {password}</p>
    </div>
  );
}
export default Login;
