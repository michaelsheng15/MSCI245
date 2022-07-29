import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { BrowserRouter as Router, Link } from 'react-router-dom';


const linkStyle = {
    textDecoration: "none",
    color: 'white'
};

const ButtonAppBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={linkStyle}>
                            Reviewify
                        </Link>
                    </Typography>
                    <Link to="/reviews" style={linkStyle}>
                        <Button color="inherit" >Reviews</Button>
                    </Link>
                    <Link to="/search" style={linkStyle}>
                        <Button color="inherit" >Search</Button>
                    </Link>
                    <Link to="/trailers" style={linkStyle}>
                        <Button color="inherit">Trailers</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box >
    );
}
export default ButtonAppBar