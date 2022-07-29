import React, { Component } from 'react';
import ButtonAppBar from '../Navigation/ButtonAppBar';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Typography } from '@mui/material';

// const serverURL = ""

const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3055";

const Search = () => {
    const [enteredMovie, setEnteredMovie] = React.useState('');
    const [enteredActor, setEnteredActor] = React.useState('');
    const [enteredDirector, setEnteredDirector] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([])

    const handleSubmit = () => {
        // console.log(enteredMovie);
        // console.log(enteredActor);
        // console.log(enteredDirector);
        callApiSearch()
            .then(res => {
                var parsed = JSON.parse(res.express)
                setSearchResults(parsed)
            })
    }

    const handleMovieChange = (e) => {
        setEnteredMovie(e.target.value)
    }
    const handleActorChange = (e) => {
        setEnteredActor(e.target.value)

    }
    const handleDirectorChange = (e) => {
        setEnteredDirector(e.target.value)
    }

    const callApiSearch = async () => {
        //return movie title, director and reviews given either movie, actor or director
        const url = serverURL + "/api/search";

        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({
                searchedMovie: enteredMovie,
                searchedActor: enteredActor,
                searchedDirector: enteredDirector,
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
                direction="column"
                spacing={2}
                style={{
                    marginTop: "50px",
                    minHeight: '90vh'
                }}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant="subtitle">For marking: unable to figure out actor search functionality. Tool works for movie name and directors. </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-full-width"
                        label="Enter a Movie:"
                        multiline
                        variant="outlined"
                        onChange={handleMovieChange}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        id="outlined-full-width"
                        label="Enter a Actor:"
                        multiline
                        variant="outlined"
                        onChange={handleActorChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-full-width"
                        label="Enter a Director:"
                        multiline
                        variant="outlined"
                        onChange={handleDirectorChange}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
                <Grid item>
                    {searchResults.map((result) => {
                        return (
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="flex-start"
                                direction="column"
                            >

                                <Grid item>
                                    <Typography variant="subtitle"><strong>Movie: </strong> {result.name}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle"><strong>Director: </strong>{result.first_name + " " + result.last_name}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle"><strong>Review Content: </strong> {result.reviewContent}</Typography>
                                </Grid>
                                <br />
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>

        </div>

    )
}

export default Search