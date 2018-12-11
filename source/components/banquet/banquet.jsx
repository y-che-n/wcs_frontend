import React, { Component } from 'react'
import { Tab, Segment, Accordion, Icon, Label, Statistic, Card } from 'semantic-ui-react'

import styles from './banquet.scss'

import axios from 'axios'

class Banquet extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            all_users: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3000/api/users').then( (response) => {

            let users = response.data.data;
            let users_clean = [];

            users.forEach(function(u) {
              if (u.points > 2) {
                users_clean.push(u);
              }
            })

            users_clean.sort(function(a, b) {
                var pointsA = a.points;
                var pointsB = b.points;
                if (pointsA > pointsB) {
                  return -1;
                }
                if (pointsA < pointsB) {
                  return 1;
                }

                // names must be equal
                return 0;
              });

            this.setState({
                users: users_clean,
                all_users: response.data.data
            });
        })
    }

    render() {
      const users = this.state.users.map( (user) => {
        return(
            <Segment className="Users__user" padded>

                <div className="Users__flex">
                    <div className="Users__flexItem">

                        <h3>{user.netid}</h3>


                    </div>
                    <div className="Users__flexItem">
                        <Statistic className="Users_statistic" size='tiny'>
                          <Statistic.Value>{user.points}</Statistic.Value>
                          <Statistic.Label>Points</Statistic.Label>
                        </Statistic>
                    </div>
                </div>
            </Segment>
        )
      })

      const allusers = this.state.all_users.map( (user) => {
        return(
            <Segment className="Users__user" padded>

                <div className="Users__flex">
                    <div className="Users__flexItem">

                        <h3>{user.netid}</h3>


                    </div>
                    <div className="Users__flexItem">
                        <Statistic className="Users_statistic" size='tiny'>
                          <Statistic.Value>{user.points}</Statistic.Value>
                          <Statistic.Label>Points</Statistic.Label>
                        </Statistic>
                    </div>
                </div>
            </Segment>
        )
      })


      const panes = [
        { menuItem: 'Banquet Invitees', render: () =>
          <Tab.Pane attached={false}>
            { users }
          </Tab.Pane> },
        { menuItem: 'All Members', render: () =>
          <Tab.Pane attached={false}>
            { allusers }
          </Tab.Pane> },
      ]



        return(
            <div>
                <h1>Users</h1>

                    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </div>
        )
    }
}

export default Banquet
