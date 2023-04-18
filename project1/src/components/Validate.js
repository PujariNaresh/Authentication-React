import React,{useState} from "react"
import {omit} from 'lodash'


//useForm =>form validate custom hook
const initState={
    
        name:"",
        email:"" ,
        pass:"" ,
        mobile:"",
       
      }


function Validate(){

    const[customer,setCustomer]=useState(initState)
      const[errors,setErrors]=useState({})



      //error printing logic
      const errPrint =(prop,msg)=>{
        setErrors({ ...errors,[prop]:msg})
      }

      //validate function
    const validate =(event,name,value)=>{
        switch(name){
            case "name":
                if(value.length === 0){
                    errPrint(name, "Name filed must be filled")
                }else if (value.length<5){
                    errPrint(name, "Name atleast have 5 letters")
                }else if(!new RegExp(/^[a-zA-Z0-9_]{3,16}$/).test(value)){
                    errPrint(name, "Invalid Name")
                }else{
                    let newOb=omit(errors,name);
                    setErrors(newOb);
                }
                break;
            case"email":
                 if(value.length === 0){
                   errPrint(name, "email filed must be filled")
                }else if(!new RegExp(/^[a-z A-Z 0-9\S]+@[a-z\s]+\.[c][o][m]+$/).test(value)){
                   errPrint(name, "Invalid email format")
                }else{
                   let newOb=omit(errors,name);
                   setErrors(newOb);
                }
            
                break;
                case "pass":
                    if(value.length === 0){
                        errPrint(name, "password filed must be filled")
                     }else if(!new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).test(value)){
                        errPrint(name, "At least 8 characters, one caps, one number")
                     }else{
                        let newOb=omit(errors,name);
                        setErrors(newOb);
                     }
                break;

            case "mobile":
                if(value.length === 0){
                    errPrint(name, "mobile filed must be filled")
                 }else if(!new RegExp(/^[6-9]\d{9}$/).test(value)){
                    errPrint(name, "Invalid Indian mobile number ")
                 }else{
                    let newOb=omit(errors,name);
                    setErrors(newOb);
                 }
                break;
            
            default:
                break;            
        }
    };

    const readValue=(e)=>{
      //  console.log('event=',e.target.name+"-"+e.target.value)
        const {name,value}= e.target;
        validate(e,name,value)
        setCustomer({...customer,[name]:value})
    }


    return{
        customer,
        errors,
        readValue,
        setCustomer,
        initState
    }

}

export default Validate