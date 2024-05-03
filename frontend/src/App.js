import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// import Home from './components/Home';
// import Layout from '../containers/Layout'
// import Home from '../pages/Home'
// import Login from '../containers/Login'
// import RecoveryPassword from '../containers/RecoveryPassword'

//Stripe peovider
<StripeProvider publishableKey="<pk_test_51PBXVfKMsoXLCRBCsEZA0QTh2xc0zthUpR59mWMgYNIXN3parrZBHwGhewxURwTWroaC3TUxcfbOJShMdFHh8Kd700fkasyMWV}">
	<Navigation />
</StripeProvider>


import Companies from './Company/pages/Companies';
import NewCompany from './Company/pages/NewCompany';
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Companies />} ></Route>
        <Route path="/companies/new" element={<NewCompany />} ></Route>
        <Route path="*" element={<NotFound/>}/>

      </Routes>

    </Router>
  );
}

export default App;