import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';


//Dev mode
const serverURL = "http://ov-research-4.uwaterloo.ca:3055"; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#000000"
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});






class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
    }
  };

  componentDidMount() {
    this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }




  render() {
    const { classes } = this.props;

    const Review = () => {

      const [selectedMovie, setSelectedMovie] = React.useState('');
      const [enteredTitle, setEnteredTitle] = React.useState('');
      const [enteredReview, setEnteredReview] = React.useState('');
      const [selectedRating, setSelectedRating] = React.useState('');
      const [displayMessage, setDisplayMessage] = React.useState('');

      const handleTitleChange = (e) => {
        console.log(e.target.value)
        setEnteredTitle(e.target.value);
      }
      const handleMovieChange = (e) => {
        console.log(e.target.value)
        setSelectedMovie(e.target.value);
      }
      const handleBodyChange = (e) => {
        console.log(e.target.value)
        setEnteredReview(e.target.value);
      }
      const handleScoreChange = (e) => {
        console.log(e.target.value)
        setSelectedRating(e.target.value);
      }

      const handleSubmit = (e) => {
        console.log(selectedMovie)
        console.log(enteredTitle)
        console.log(enteredReview)
        console.log(selectedRating)

        if(enteredTitle == ""){
          setDisplayMessage("Please enter your review title");
        }else if (enteredReview == ""){
          setDisplayMessage("Please enter your review");
        }else if (selectedRating == ""){
          setDisplayMessage("Please select the rating")
        }else{
          setDisplayMessage(selectedMovie + "\n" + enteredTitle + "\n" + enteredReview + "\n" + selectedRating + "\n");
        }
      }



      return (
        <Grid
          container
          spacing={8}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          style={{ minHeight: '100vh' }}
          className={classes.mainMessageContainer}
        >
          <Grid item>
            <Typography variant="h3">
              Review a movie!
            </Typography>
          </Grid>

          <MovieSelection onChange={handleMovieChange} />
          <ReviewTitle onChange={handleTitleChange} />
          <ReviewBody onChange={handleBodyChange} />
          <ReviewRating onChange={handleScoreChange} />

          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
          <Grid>
            {displayMessage}
          </Grid>


        </Grid>
      )
    }

    const MovieSelection = (props) => {
      return (
        <Grid item>
          <InputLabel>Select a Movie</InputLabel>
          <Select onChange={props.onChange}>
            <MenuItem value={"Jurassic World Dominion"}>Jurassic World Dominion</MenuItem>
            <MenuItem value={"Lightyear"}>Lightyear</MenuItem>
            <MenuItem value={"Top Gun: Maverick"}>Top Gun: Maverick</MenuItem>
            <MenuItem value={"Doctor Strange in the Multiverse of Madness"}>Doctor Strange in the Multiverse of Madness</MenuItem>
            <MenuItem value={"Sonic the Hedgehog 2"}>Sonic the Hedgehog 2</MenuItem>
          </Select>
        </Grid>
      )
    }

    const ReviewTitle = (props) => {
      return (
        <Grid item>
          <TextField id="standard-basic" label="Title" onChange={props.onChange} />
        </Grid>
      )
    }

    const ReviewBody = (props) => {
      return (
        <Grid item>
          <TextField
            label="Enter your review here:"
            multiline
            inputProps={{ maxLength: 200 }}
            variant="outlined"
            onChange={props.onChange}
          />
        </Grid>
      )
    }

    const ReviewRating = (props) => {
      return (
        <Grid item>
          <RadioGroup row aria-label="position" name="position" defaultValue="top" onChange={props.onChange}>
            <Radio
              value="1"
              label="1"
              labelPlacement="top"
              inputProps={{ 'aria-label': '1' }}
            />
            <Radio
              value="2"
              label="2"
              labelPlacement="top"
              inputProps={{ 'aria-label': '2' }}
            />
            <Radio
              value="3"
              label="3"
              labelPlacement="top"
              inputProps={{ 'aria-label': '3' }}
            />
            <Radio
              value="4"
              label="4"
              labelPlacement="top"

              inputProps={{ 'aria-label': '4' }}
            />
            <Radio
              value="5"
              label="5"
              labelPlacement="top"

              inputProps={{ 'aria-label': '5' }}
            />
          </RadioGroup>
        </Grid>
      )
    }


    const mainMessage = (
      <Grid
        container
        spacing={8}
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >
        <Typography
          variant={"h3"}
          className={classes.mainMessage}
          align="flex-start"
        >
          {this.state.mode === 0 ? (
            <React.Fragment>
              Welcome to MSCI245
            </React.Fragment>
          ) : (
            <React.Fragment>
              Welcome back!
            </React.Fragment>
          )}
        </Typography>
      </Grid>
    )


    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Paper
            className={classes.paper}
          >
            {mainMessage}
            <Review />

          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
