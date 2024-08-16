import React from 'react'
import { Link } from "react-router-dom"; 


const Header = () => {
  return (
    <>
      <div className="header">

        <div className="logo">
            <Link to="/" className='logoname'> Logo </Link>
        </div>

        <div className="menu">
            <Link className="nav-menu" to="/">ToDo List</Link>
        </div>
       
      </div>
    </>
  )
}

export default Header
