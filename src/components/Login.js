import React, { useState } from 'react'
import { useHistory } from 'react-router';

function Login() {
  const host = "http://localhost:5000";
  let history = useHistory();

  const [body, setbody] = useState({ email: "", password: "" })



  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/register/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log(data)
    if (data.success) {
      localStorage.setItem('token', data.jwttoken);
      history.push("/")
    } else {
      alert("invalid details")
    }

  }
  const onChange = (e) => {
    setbody({ ...body, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <h2>Login here</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="htmlForm-label">Email address</label>
          <input type="email" onChange={onChange} className="htmlForm-control" name="email" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="htmlForm-label">Password</label>
          <input type="password" onChange={onChange} classNameName="htmlForm-control" name="password" id="password" />
        </div>
        <button type="submit" className="btn-primary" ></button>
      </form>
    </div>
  )
}

export default Login
