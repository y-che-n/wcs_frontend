import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import styles from './home.scss'

import Dash from '../dash/dash.jsx'
import Events from '../events/events.jsx'
import Points from '../points/points.jsx'
import SignIn from '../signin/signin.jsx'
import NewEvent from '../newevent/newevent.jsx'
import Banquet from '../banquet/banquet.jsx'
import Feedback from '../feedback/feedback.jsx'

class Home extends Component {
    render() {
        return(
            <Router>
                <div className="Home">
                    <div className="Home__leftNav">
                        <img src="./assets/logo.png" />
                        <div className="Home__flex">
                            <Link className="Home__flexItem" to="/">Home</Link>
                            <Link className="Home__flexItem" to="/events">Events</Link>
                            <Link className="Home__flexItem" to="/points">Points</Link>
                            <Link className="Home__flexItem" to="/signin">Sign-in</Link>
                            <Link className="Home__flexItem" to="/banquet">Banquet</Link>
                            <Link className="Home__flexItem" to="/feedback">Feedback</Link>
                        </div>
                    </div>
                    <div className="Home__content">
                        <div>
                            <Route exact path="/" component={Dash}/>
                            <Route exact path="/points" component={Points}/>
                            <Route exact path="/events" component={Events}/>
                            <Route exact path="/signin" component={SignIn}/>
                            <Route exact path="/banquet" component={Banquet}/>
                            <Route exact path="/feedback" component={Feedback}/>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Home
