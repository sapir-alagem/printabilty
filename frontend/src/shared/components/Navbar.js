import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Dropdown from 'react-bootstrap/Dropdown';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Logo />
      <Link className="navbar-brand" to="/">Printabillity</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link text-primary" to="/UploadFile">Upload File</Link>
          </li>
          <li className="nav-item dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="link" id="navbarDropdown" className="dropdown-title">
                Companies
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/companies">Companies</Dropdown.Item> {/* this should be availbe only for super admins (us) */}
                <Dropdown.Item as={Link} to="/companies/new">New Company</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/something-else">Something else here</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

