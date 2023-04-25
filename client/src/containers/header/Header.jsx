import React from 'react'
import "./header.css"
import { Container } from '@mui/material';
import Navbar from '../../components/navbar/navbar';

const Header = ()=>{
  return (
    <Container component="header" maxWidth={false} style={{padding:0}}>
      <Navbar></Navbar>
    </Container>
  )
}

export default Header;