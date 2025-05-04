import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>{/* Add your routes here */}</Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
