import React from 'react'
import { Link,useHistory } from 'react-router-dom'
function Navbar() {
  let history=useHistory();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history.push('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/About">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex">
            <Link className="btn btn-primary mx-2" to="/login">Login</Link>
            <Link className="btn btn-primary mx-2" to="/singup">Singup</Link>
           </form>:<button className="btn btn-primary" onClick={handleLogout}>logout</button>
           }      
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
