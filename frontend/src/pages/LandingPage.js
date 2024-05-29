
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to our Website!</h1>
      <p className="lead">This is the landing page content.</p>
      <nav>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="btn btn-primary mr-2" to="/companies">Companies</Link>
          </li>
          <li className="nav-item">
            <Link className="btn btn-primary mr-2" to="/companies/new">New Company</Link>
          </li>
          <li className="nav-item">
            <Link className="btn btn-primary" to="/UploadFile">Upload File</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LandingPage;
