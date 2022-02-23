import React, { useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth";
import { auth } from "./squad-config";
import LandingPage from "./components/landing/LandingPage";
import StudentReport from "./container/studentReport/StudentReport";
import Header from "./components/header/Header";

function App() {
  // function to auth admin

  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Header user={user} />
        {!user ? (
          <Auth />
        ) : (
          <Routes>
            <Route
              path="/:groupId/:memberName"
              element={
                <>
                  <StudentReport />
                  <LandingPage />
                </>
              }
            />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
