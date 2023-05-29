import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/navbar/Navbar";
import HomePage from "./component/homePage/HomePage";
import DashBoardPage from "./component/dashBoardPage/DashBoardPage";
import GoogleAuthCallback from "./component/googleAuthCallback/GoogleAuthCallback";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route
            path="/auth/google/callback"
            element={<GoogleAuthCallback />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
