import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";


function Menu(){
      let token = localStorage.getItem('loginStatus') ? localStorage.getItem('loginStatus') : false
  
      const logoutUser = () => {
        if(window.confirm (`Are you sure to logout ?`)) {
            toast.success('logout successfully')
            localStorage.clear();
            window.location.href="/";
        } else {
            return;
        }
      }

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
        <div className="container">
          <NavLink to={`/`} className="navbar-brand">
            PROGRESS
          </NavLink>

          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="menu" >
            {token === "true" ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to={`/`} className="nav-link">
                    Home
                  </NavLink>
                </li>
              </ul>
            ) : null}

            {token === "true" ? null : (
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink className="nav-link" to={`/login`}>
                        Login
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to={`/register`}>
                        Register
                    </NavLink>
                    </li>
                </ul>
            )
        }
        {
         
         token === 'true' ? (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to={`/`} className="nav-link btn btn-danger" onClick={logoutUser}>Logout</NavLink>
                </li>
            </ul>
         ) : null
          
        }
          </div>
        </div>
      </nav>
    );
}

export default Menu