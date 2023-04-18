import React from "react";
import { BrowserRouter as Router, Navigate, Route , Routes } from "react-router-dom";
import ProtectedRoute from "./middleware/ProtectedRoute";

import { ToastContainer } from "react-toastify"; 


import Home from './components/Home'
import Login from './components/Login'
import Menu from './components/Menu'
import Pnf from "./components/Pnf";
import Register from './components/Register'

function App() {
    let token = localStorage.getItem('loginStatus') ? localStorage.getItem('loginStatus') : false
  return (
    <Router> 
      <Menu />
      <ToastContainer autoClose={3000} position={"top-right"}/>
          <Routes>
              <Route path={`/login`} element={token === 'true' ? <Navigate to={`/`}/> : <Login/>} />
              <Route path={`/register`} element={token === 'true' ? <Navigate to={`/`} />:<Register/>} />

              <Route element={<ProtectedRoute />}>
                  <Route path={`/`} element={<Home />} />
              </Route>

              <Route path={`/*`} element={<Pnf />} />
          </Routes>
    </Router>
  );
}




export default App