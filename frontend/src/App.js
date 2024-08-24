import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";

import Login from "./auth/pages/login";
import LandingPage from "./pages/LandingPage";
import Companies from "./Company/pages/Companies";
import NewCompany from "./Company/pages/NewCompany";
import SignupForm from "./Company/pages/CompanySignupForm";
import SuccessSingup from "./Company/pages/succesfulSingup";
import UploadFile from "./File/Pages/UploadFilePage";
import NotFound from "./pages/NotFound";
import SummaryPage from "./File/Pages/SummeryPage";
import Layout from "./shared/components/Layout";
import Checkout from "./Payments/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import QRCodeIndex from "./QRCode/pages/QRCodeIndex";
import PrinterIndex from "./Printer/pages/PrinterIndex";
import RequireAuth from "./auth/components/RequireAuth";
import PersistLogin from "./auth/components/PersistLogin";
import OnboardingForm from "./Onboarding/pages/OnboardingForm";
import SingUp from "./Onboarding/pages/SingUp";
import Login from "./Onboarding/pages/Login";

const stripePromise = loadStripe(
  "pk_test_51OlWKuEfxT2rIn1yjXfG5QpuSBYmXKB1ORUnQWuoSDk2bKOhk5WpezGx1xKKsCfu1kdkmBruvVW5UGzQ1ejQGvQm00d3c0qhxQ"
);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Layout>
        <Routes>
          {/* public routes*/}
          <Route path="/Login" element={<Login />} />
          <Route path="/UploadFile" element={<UploadFile />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/companies/new" element={<NewCompany />} />
            <Route path="/onboarding" element={<OnboardingForm />} />
            <Route path="/SingUp" element={<SingUp />} />
            <Route path="/Login" element={<Login />} />
          <Route path="/companies/new/form" element={<SignupForm />} /> {/* TO DELETE */}
          <Route path="/companies/new/success" element={<SuccessSingup />} />

          {/* protected routes*/}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={["super admin"]} />}>
              <Route path="/companies" element={<Companies />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={["company admin", "super admin"]} />
              }
            >
              <Route
                path="/companies/:companyId/qrcodes"
                element={<QRCodeIndex />}
              />
              <Route
                path="/companies/:companyId/printers"
                element={<PrinterIndex />}
              />
            </Route>
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Elements>
  );
}

export default App;
