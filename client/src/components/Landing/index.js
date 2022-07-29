import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import ButtonAppBar from "../Navigation/ButtonAppBar"
import { Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const linkStyle = {
    textDecoration: "none",
    color: 'white',
    background: '#1976d2',
    margin: '25px',
    borderRadius: '5px',
    padding: '8px 35px'
};
const Landing = () => {

    return (
        <Grid
            container
            direction="column"
        >
            <ButtonAppBar />

            <Grid container
                justifyContent='center'
                direction='column'
                alignItems='center'
                spacing={4}
                style={{ marginTop: "50px" }}
            >

                <Typography variant='h2'>Welcome to Reviewify!</Typography>
                <Typography variant='subtitle'>A movie review application</Typography>

                <Link to="/reviews" style={linkStyle}>
                    <Button color="inherit" >Reviews</Button>
                </Link>
                <Link to="/search" style={linkStyle}>
                    <Button color="inherit" >Search</Button>
                </Link>
                <Link to="/trailers" style={linkStyle}>
                    <Button color="inherit">Trailers</Button>
                </Link>
            </Grid>

        </Grid>
    )
}


export default Landing;

