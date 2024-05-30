import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './App.css';

// import Home from './components/Home';
// import Layout from '../containers/Layout'
// import Home from '../pages/Home'
// import Login from '../containers/Login'
// import RecoveryPassword from '../containers/RecoveryPassword'

import LandingPage from './pages/LandingPage';
import Companies from './Company/pages/Companies';
import NewCompany from './Company/pages/NewCompany';
import UploadFile from './File/Pages/UploadFilePage';
import NotFound from './pages/NotFound';
import SummaryPage from './File/Pages/SummeryPage'
import Layout from './shared/components/Layout';
import Checkout from './Payments/CheckoutPage'
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';

const stripePromise = loadStripe('pk_test_51OlWKuEfxT2rIn1yjXfG5QpuSBYmXKB1ORUnQWuoSDk2bKOhk5WpezGx1xKKsCfu1kdkmBruvVW5UGzQ1ejQGvQm00d3c0qhxQ');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Layout>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/new" element={<NewCompany />} />
            <Route path="/UploadFile" element={<UploadFile />} />
          <Route path="/checkout" element={<Checkout />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="*" element={<NotFound />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          </Routes>
        </Layout>
    </Router>
    </Elements>
  );
}

export default App;