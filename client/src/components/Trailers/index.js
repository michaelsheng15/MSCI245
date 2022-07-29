import React, { Component } from 'react';
import ButtonAppBar from '../Navigation/ButtonAppBar';
import Grid from "@material-ui/core/Grid";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { BrowserRouter as Router, Link } from 'react-router-dom';

//Page Functionality 
//Create a new trailer table that has FK to movies table
//Users can select a movie and few the corresponding trailer
//Users can add the link to a trailer for movies that do not have trailers yet
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3055"; //enable for dev mode


const ViewTrailers = () => {

    React.useEffect(() => {
        callApiGetMovies()
            .then(res => {
                var parsed = JSON.parse(res.express)
                setMovies(parsed)
            })
    }, [])

    const callApiGetMovies = async () => {
        const url = serverURL + "/api/getMovies";

        const response = await fetch(url, {
            method: "POST",
        })
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const [selectedMovie, setSelectedMovie] = React.useState('')
    const [movies, setMovies] = React.useState([])
    const [trailerURL, setTrailerURL] = React.useState('')
    const [trailerFound, setTrailerFound] = React.useState()


    const handleChange = (e) => {
        setSelectedMovie(e.target.value)
    }

    const handleSubmit = () => {
        console.log(selectedMovie);
        callAPIFindTrailer()
            .then(res => {

                console.log(JSON.stringify(res.express))
                if (JSON.stringify(res.express) == '"[]"') {
                    console.log('here');
                    setTrailerFound("false")
                } else {
                    setTrailerFound("true")
                    var parsed = JSON.parse(res.express)
                    var url = parsed[0].trailerURL
                    console.log(trailerFound);
                    setTrailerURL(url)
                }
            })
    }

    const callAPIFindTrailer = async () => {
        const url = serverURL + "/api/findTrailer";

        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({
                movieID: selectedMovie.id,
                movieTitle: selectedMovie.name
            })

        })
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }


    return (

        <div>
            <ButtonAppBar />

            <Grid container
                spacing={3}
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '80vh' }}>

                <Grid item>
                    <Typography variant="h3" align="center">Search for Trailers</Typography>
                    <Typography variant="subtitle" align="center">Select a movie from the dropdown and press submit. If a trailer is available a linked button will appear. Verification has also been included to a message will appear if no trailer was found.</Typography>


                </Grid>

                <Grid item>
                    <Typography variant="body" align="center">For marking: trailer URL's are available for the first 2 movies (12 Angry Men and 2001: A Space Odyssey)</Typography>
                </Grid>

                <Grid item>
                    <InputLabel>Select a Movie</InputLabel>
                    <Select onChange={handleChange}>
                        {movies.map(function (m) {
                            return <MenuItem value={m}>{m.name}</MenuItem>
                        })}
                    </Select>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>

                {trailerFound == "true" &&

                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{ marginTop: "50px" }}>
                        <Grid item >
                            <Typography variant="h2" align="center">
                                Trailer has been found in our database!
                            </Typography>


                        </Grid>
                        <Grid item >
                            <Link to={{ pathname: trailerURL }} target="_blank">
                                <Button variant="contained" color="primary" >
                                    Watch Trailer
                                </Button>

                            </Link>
                        </Grid>
                    </Grid>

                }

                {trailerFound == "false" && <Grid item>
                    <Typography variant="h3">
                        No trailer found - please try a different movie.
                    </Typography>
                </Grid>}



            </Grid>
        </div>


    )
}
export default ViewTrailers