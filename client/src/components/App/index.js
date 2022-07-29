import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Home from '../Home';
import Landing from '../Landing'
import Search from '../Search'
import PrivateRoute from '../Navigation/PrivateRoute.js';
import ViewTrailers from '../Trailers';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
	  <Router>
	    <div>
        <Route path="/" exact component={Landing}/>
        <Route path="/reviews" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Route path="/trailers" exact component={ViewTrailers} />
	    </div>
	  </Router>
    );
  }
}

export default App;