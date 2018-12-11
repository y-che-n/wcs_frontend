import React, { Component } from 'react'
import { Input, Card, Button, Dropdown } from 'semantic-ui-react'
import Notifications, {notify} from 'react-notify-toast';
import styles from './feedback.scss'
import axios from 'axios'
class Feedback extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            date: '',
            message: ''
        }

        this.handleName = this.handleName.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleName(event) {
        this.setState({name: event.target.value});
    }
    handleDate(event) {
        this.setState({date: event.target.value});
    }
    handleMessage(event) {
        this.setState({message: event.target.value});
    }
    handleEnter(tgt) {
      if (tgt.charCode === 13) {
        this.handleSubmit();
      }
    }
    handleSubmit() {
      var body = {
           text: 'incoming feedback from ' + this.state.name + ' on ' + this.state.date + ': ' + this.state.message,
           channel: 'UEDJ9HD1D',
       };
      axios({
        method: 'post',
        url: 'https://slack.com/api/chat.postMessage?token=xoxp-488468375939-489621591047-500355993635-372d86a9e8cad921020c48cb8600f4f1&channel=UEDJ9HD1D&text=' + body.text,
        data: body
      },
      { headers: {'Content-Type':'application/json'}})
      .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
      });
    }
    handleStatus(response) {
      if (response.status === 201)
        notify.show(`feedback was submitted`, "success")
      else if (response.status === 500)
        notify.show("please try again", "error");
    }
    componentWillMount() {
    }
    render() {
        return(
            <Card fluid className="Feedback">
              <Notifications />
                <Card.Content>
                    <h4>Name and Netid</h4>
                    <Input fluid placeholder='[Name] - [netid]' value={this.state.name} onChange={this.handleName} onKeyPress={this.handleEnter}/>
                    <br />
                    <h4>Date</h4>
                    <Input fluid placeholder='i.e. DD/MM/YY or DD-MM-YY or January 1, 2018' value={this.state.date} onChange={this.handleDate} onKeyPress={this.handleEnter}/>
                    <br />
                    <h4>Message</h4>
                    <Input fluid placeholder='Put your feedback for the website here!' value={this.state.message} onChange={this.handleMessage} onKeyPress={this.handleEnter}/>
                    <br />
                    <Button fluid onClick={this.handleSubmit}>Submit Feedback</Button>
                </Card.Content>
            </Card>
        )
    }
}
export default Feedback
