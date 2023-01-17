import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import Home from "./container/Home";
import { SessionProvider } from "next-auth/react";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
