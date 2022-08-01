import React from 'react'
import "./header.css"
import { Navbar } from '../../components/navbar/Navbar'


const Header = ()=>{
  return (
    <header>
      <a href="/" className="logo">Xportify</a>
      <Navbar />
    </header>
  )
}

export default Header;