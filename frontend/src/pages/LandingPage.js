import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Welcome to our Website!</h1>
      <p>This is the landing page content.</p>
      <nav>
        <ul>
          <li><Link to="/companies">Companies</Link></li>
          <li><Link to="/companies/new">New Company</Link></li>
          <li><Link to="/UploadFile">Upload File</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default LandingPage;
