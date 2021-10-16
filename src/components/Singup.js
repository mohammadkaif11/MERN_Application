import React,{useState} from 'react'
import { useHistory } from 'react-router';

function Singup() {
  const host="http://localhost:5000";
  let history=useHistory();

  const [body, setbody] = useState({name:"",email:"",password:""})
 


  const handleSubmit= async(e)=>{
    e.preventDefault();
      const response= await fetch(`${host}/register/Singup`,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(body)
      });
      const data= await response.json();
      console.log(data)
   if(data.success){
     localStorage.setItem('token',data.jwttoken);
     history.push("/");
   }else{
     alert("invalid details")
   }
  
   }
   const onChange=(e)=>{
    setbody({...body,[e.target.name]:e.target.value});
    }
  return (
    <div>
          <h2>Singup here</h2>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="htmlForm-label">User Name</label>
            <input type="text" onChange={onChange} className="htmlForm- control" name="name" id="name" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="htmlForm-label">Email address</label>
            <input type="email" onChange={onChange} className="htmlForm-control" name="email" id="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="htmlForm-label">Password</label>
            <input type="password" onChange={onChange} classNameName="htmlForm-control" name="password" id="password" />
          </div>
          <button type="submit" className="btn btn-primary" ><i className="fas fa-sign-in-alt"></i></button>
        </form>
      </div>

    </div>
  )
}

export default Singup
