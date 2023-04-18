import React,{useState} from 'react';
import {toast} from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Validate from './Validate';
const baseURL="http://localhost:9703"

function Create(props){
      //internal navigate
      const navigate=useNavigate()

    const {customer,errors,readValue,setCustomer,initState}=Validate()

             //submit handler function
             const submitHandler= async(e)=>{
              e.preventDefault();//to avoid page refresh
            //   if (Object.keys(errors).length===0 && Object.keys(customer).length!==0){
            //       console.log('new contact=',customer)
            //       //post handler 
            //       await axios.post(`${baseURL}/customers`,customer)
            //         .then(res=>{
            //           setCustomer(initState)
            //           toast.success("user created")
            //           navigate('/');
            //         }).catch(err=>toast.error(err.message))
            // //   }else {
            //       toast.error("some Errors are in form")
            //   }  
              try {
                // console.log('user =',user)
              let res = await axios.get(`${baseURL}/customers`)
                // console.log('res =' ,res.data)
           
                let extCustomer = res.data.find((item) => item.email === customer.email )
                  if(extCustomer) {
                    toast.warning("Customer already registered")
                  } else {
                    await axios
                      .post(`${baseURL}/customers`, customer)
                      .then((res) => {
                        toast.success("Customer registered successfully");
                        navigate(`/`);
                      })
                      .catch((err) => toast.error(err.message));
                  }
               
            } catch (err) {
                toast.error(err.response.data.message)
            } 
          }
    
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className='display-4 text-success'>Register</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className='card'>
                        <div className="card-body">
                            <form autoComplete="off" onSubmit={submitHandler}>
                                <div className="form-group mt-2">
                                  <label htmlFor="name">Name</label>
                                  <input type="text" name="name" value={customer.name} onChange={readValue} id="name" minLength={3}
                                   className="form-control" required  />
                                   {
                                    errors && errors.name ? (
                                      <div className="alert alert-danger">{errors.name}</div>
                                    ) : null
                                   }
                                </div>
                                <div className="form-group mt-2">
                                  <label htmlFor="email">Email</label>
                                  <input type="email" name="email" value={customer.email} onChange={readValue} id="email" placeholder="user@gmail.com" 
                                  className="form-control" required/>
                                  {
                                    errors && errors.email?(
                                      <div className="alert alert-danger">{errors.email}</div>
                                    ):null
                                   }
                                </div>
                                <div className="form-group mt-2">
                                <label htmlFor="password">Password</label>
                                    <input type="pass" name="pass" value={customer.pass} onChange={readValue} id="pass" className="form-control" required />

                                   {
                                    errors && errors.pass?(
                                      <div className="alert alert-danger">{errors.pass}</div>
                                    ):null
                                   }
                                  </div>  
                                <div className="form-group mt-2">
                                  <label htmlFor="mobile">Mobile</label>
                                  <input type="number" name="mobile" value={customer.mobile} onChange={readValue} id="mobile"
                                   className="form-control" required/>
                                   {
                                    errors && errors.mobile?(
                                      <div className="alert alert-danger">{errors.mobile}</div>
                                    ):null
                                   }
                                  </div>  
                                
                                <div className="form-group mt-2">
                                  <input type="submit" value='Register' className="btn btn-outline-success" />
                                </div>  
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    )
}
export default Create