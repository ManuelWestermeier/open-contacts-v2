import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page-not-found">
      <h1>Page Not found</h1>
      <h4>
        <Link to="/">Home</Link>
      </h4>
    </div>
  );
}

export default NotFound;
