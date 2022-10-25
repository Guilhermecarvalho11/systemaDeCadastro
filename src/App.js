import React from "react";
import firebase from "./services/firebaseConnections";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import AuthProvider from "./contexts/auth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
