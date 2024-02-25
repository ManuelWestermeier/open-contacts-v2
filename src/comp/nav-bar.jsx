import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Open-Contacts-v2
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                role="button"
                to="/contacts"
              >
                Contacts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                role="button"
                to="/search"
              >
                Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                role="button"
                to="/you"
              >
                You
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to="profile"
              >
                Profile
              </NavLink>

              <ul className="dropdown-menu">
                <li>
                  <button onClick={async e => {
                    const url = new URL(document.location)
                    url.hash = `/search/user/${user}`
                    navigator.share({
                      url,
                      title: `add ${await API.get("user-name", user)} on Opnen-Contacts-V2`
                    })
                  }} className="dropdown-item btn btn-primary">
                    Share Your Profile
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item" to={"profile/login"}>
                    Log In
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="profile/logout">
                    Log out
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
