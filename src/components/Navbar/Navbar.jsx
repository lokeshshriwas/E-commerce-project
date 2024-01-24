import React from 'react'
import "./Navbar.css"
import { AppBar, Badge, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import logo from "../../assets/pj.png"
import { Link, useLocation } from 'react-router-dom'


function Navbar({totalItems}) {
    const location = useLocation()

  return (
    <>
        <AppBar className='appBar' color='inherit'>
            <Toolbar>
                <Typography component={Link} to="/"  variant='h6' className='title' color="inherit">
                    <img src={logo} alt='Commerce js' height="45px" className='image' />
                    Commerce.js
                </Typography>
                <div className='grow'/>
                {location.pathname === "/" && (
                <div className='button'>
                    <IconButton component={Link} to="/cart" aria-label='Show cart items' color="inherit">
                        <Badge badgeContent={totalItems} color='secondary'>
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                </div>
                )}
            </Toolbar>
        </AppBar>

    </>
  )
}

export default Navbar