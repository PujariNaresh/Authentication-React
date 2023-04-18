import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const url = "http://localhost:9703";

function Login() {
  const [customer, setCustomer] = useState({
    email: "",
    pass: "",
  });

  const navigate = useNavigate();

  const readValue = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try { 

      // console.log('customer =',customer)
      let extCustomer = await axios.get(`${url}/customers`)
        console.log('extCustomer =',extCustomer.data)
      
      let single = extCustomer.data.find((item) => item.email === customer.email)
        console.log('single =' ,single)
        
      if(!single) {
        toast.warning("Customer doesn't exists.")
      }else {
          if (single.pass === customer.pass) {
          localStorage.setItem("loginStatus" ,true)
        //navigate(`/`)
        window.location.href="/";
      } else {
        toast.error(`password are doesn't match`)
      }
      
      }
    }catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-success">Login</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler}>
                <div className="form-group mt-2">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" value={customer.email}onChange={readValue}id="email"className="form-control"required/>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="pass">Password</label>
                  <input type="password" name="pass" value={customer.pass} onChange={readValue} id="pass" className="form-control"required/>
                </div>
                <div className="form-group mt-2">
                  <input type="submit" value="Login" className="btn btn-outline-success"required/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
