import React,{useCallback,useState,useEffect} from 'react'

const url = 'http://localhost:9703'
function Home(props) {
  
  const [customer,setCustomer] = useState([])

   const getCustomer = async() =>{
    await fetch(`${url}/customers`)
    .then(res =>res.json())
    .then(out =>{
      console.log("Customer =",out)
      setCustomer(out)
    }).catch(err =>console.log(err.message))

   }
   const initCustomer = useCallback(() =>{
     getCustomer()
   },[]) 

   useEffect(() =>{
    initCustomer()
   },[])
  return (
    <div className='container'>
         <div className="row">
          <div className="div col-md-12 text-center">
            <h3 className="display-3 text-success">Dashboard</h3>
          </div>
        </div>
         <div className="row">
            {
            customer && customer.map((item,index) =>{
              return(
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card mt-3 mb-3">
                        <div className="card-header">

                            <h4 className="text-success text-center">{item.name}</h4>
                        </div>
                        <div className="card-body">
                            <p>
                            <strong>Id</strong>
                            <span className="text-success float-end">{item.id}</span>
                            </p>
                            <p>
                            <strong>Email</strong>
                            <span className="text-success float-end">{item.email}</span>
                            </p>
                            <p>
                            <strong >Phone</strong>
                            <span className="text-secondary float-end">{item.mobile}</span>
                            </p>
                        </div>
                        </div>
                      </div>
                
              )
            })
          } 
         </div>
       
    </div>
  )
}

export default Home