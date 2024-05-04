import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {StripeProvider} from '@stripe/stripe-react-native';
// import Home from './components/Home';
// import Layout from '../containers/Layout'
// import Home from '../pages/Home'
// import Login from '../containers/Login'
// import RecoveryPassword from '../containers/RecoveryPassword'

//Stripe Provider
const STRIPE_KEY = 'pk_test_51PBXVfKMsoXLCRBCsEZA0QTh2xc0zthUpR59mWMgYNIXN3parrZBHwGhewxURwTWroaC3TUxcfbOJShMdFHh8Kd700fkasyMWV';

import Companies from './Company/pages/Companies';
import NewCompany from './Company/pages/NewCompany';
import UploadFile from './File/Pages/UploadFilePage';
import PaymentApproval from '.Payments/pages/PaymentApproval';
import NotFound from './pages/NotFound';

function App() {
  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
      <Router>
      <Routes>
        <Route path="/" element={<Companies />} ></Route>
        <Route path="/companies/new" element={<NewCompany />} ></Route>
        <Route path="/UploadFile" element={<UploadFile />} ></Route>
        <Route path="/PaymentApproval" element={<PaymentApproval />} ></Route>

        <Route path="*" element={<NotFound/>}/>
      </Routes>

    </Router>
    </StripeProvider>
  );
}

export default App;