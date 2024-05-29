import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} ></Route>
          <Route path="/companies" element={<Companies />} ></Route>
          <Route path="/companies/new" element={<NewCompany />} ></Route>
          <Route path="/UploadFile" element={<UploadFile />} ></Route>
          <Route path="/summary" element={<SummaryPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;