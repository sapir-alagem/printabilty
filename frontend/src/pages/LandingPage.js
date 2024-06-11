import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function LandingPage() {
  return (
    <div className="container text-center my-5"> {/* Use Bootstrap classes */}
      <h1 className="display-4 text-primary">Welcome to Printability!</h1>
      <p className="lead text-secondary">This is the landing page content.</p>
      <div className="my-4">
        <h2>Our Services</h2>
        <p>Printability offers a wide range of printing services to meet all your needs, from personal projects to business marketing materials.</p>
      </div>
      <div className="row">
        <div className="col-md-4">
          <h3>Document Printing</h3>
          <p>High-quality document printing in various formats and styles.</p>
          <Link to="/document-printing" className="btn btn-primary">Learn More</Link>
        </div>
        <div className="col-md-4">
          <h3>Photo Printing</h3>
          <p>Bring your memories to life with our premium photo printing service.</p>
          <Link to="/photo-printing" className="btn btn-primary">Learn More</Link>
        </div>
        <div className="col-md-4">
          <h3>Custom Projects</h3>
          <p>Have a unique project? We can print custom sizes and materials.</p>
          <Link to="/custom-projects" className="btn btn-primary">Learn More</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;