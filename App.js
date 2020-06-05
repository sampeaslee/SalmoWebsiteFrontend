import React, { Component, } from 'react';

import Alert from 'react-bootstrap/Alert'
import { Table } from "react-table";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import ReactDOM from 'react-dom'
import salmon from './pics/salmon.jpg';
import logo from './logo.svg';
import GridLayout from 'react-grid-layout'
import './App.css';
import './table.css';
import axios from 'axios';


import AlertDismissible from './enterEvet'
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            greeting: "",
            name: "",
            id: "",
            email: "",
            age: "",
            size: 3,
            showAlert: false,
            days: [],
            weather: []

        }
    
}
    sayHello = async (event) => {
        event.preventDefault();

        let response = await fetch('/Salmo?name=' + this.state.greeting);;
        let body = await response.json();
        console.log("SAM")
        this.setState({ greeting: body.name, isLoading: false, isGreetingVisible: '' });
        
    }

    getDays = async () => { 
       let response = await fetch('/days?days');;
       let body = await response.json();
       console.log(body)
       this.setState({ days: body });
    }

    getWeather = async () => {

        let response = await fetch('/weather?weather');
        let body = await response.json();
        console.log(body)
        this.setState({ weather: body });
    }


    getEvent = async (event) => {
        event.preventDefault();
        let response = await fetch('/SalmoEvent?event');
        let body = await response.json();

        this.setState({ greeting: body.event, isLoading: false, isGreetingVisible: '' });

    }

    updateMessage = (event) => {

        event.preventDefault();
        this.setState({ greeting: event.target.value, isLoading: false });

    }
    updateName = (event) => {
        event.preventDefault();

        this.setState({ name: event.target.value})
    }
    updateID = (event) => {
        event.preventDefault();

        this.setState({ id: event.target.value })
    }
    updateEmail = (event) => {
        event.preventDefault();

        this.setState({ email: event.target.value })
    }
    updateAge = (event) => {
        event.preventDefault();

        this.setState({ age: event.target.value })
    }

    showAlerts = () => {
        this.setState({ showAlert: true })
        console.log(this.state.size)
    }
    hideAlert = () => {
        this.setState({ showAlert: false })
    }

    state = {
        date: new Date(),
    }

    onChange = (date) => {
        this.setState({ date })
        this.showAlerts();
    }

    componentDidMount = () => {
        this.getDays();
        this.getWeather();
    }

    sendUser = async (event) => {
        let user = { name: this.state.name,  email: this.state.email, id: this.state.id }
        fetch("http://localhost:8080/Salmo",  {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                email: this.state.email
              
            })
        });
    }

    render() {
        let rows = [];
        for (var i = 0; i < this.state.size; i++) {
            let rowID = `row${i}`
            let cell = []
    
            rows.push(<tr key={i} id={rowID}>sam</tr>)
        }


        return (
            <body >
                <style>{'body { background-color: steelblue; }'}</style>
                <div className="Salmon-logo">

                    <img src={salmon} />
                    
                    <text style={{ width: '150px' }}> Salmo's Website </text>
                    <img src={this.state.weather[2]} />
                    <div className="weather">

                    <text> Temperature : {this.state.weather[0]}</text>
                    <text> Conditions: {this.state.weather[1]}</text>
                   
                    </div>
                    <button onClick={() => this.getWeather()} className= "refresh">Refresh</button>
               </div>
               <div className="App">
                   <DatePicker
                       className = "Date-picker"
                       onChange={this.onChange}
                        value={this.state.date}
                       />

            
                   <div className="Add-event">
                       <AlertDismissible vis={this.state.showAlert} onPress={this.hideAlert} />
                   </div>
                       <table >
                           <tbody>
                                <tr>
                                <th>Monday {this.state.days[0]}</th>
                                <th>Tuesday {this.state.days[1]}</th>
                                <th>Wednesday {this.state.days[2]}</th>
                                <th>Thursday {this.state.days[3]}</th>
                                <th>Friday {this.state.days[4]}</th>
                                <th>Saturday {this.state.days[5]}</th>
                                <th>Sunday {this.state.days[6]}</th>
                                </tr>
                               <tr >
                                   <td onClick={() =>{this.showAlerts()}}></td>
                                   <td onClick={() => { console.log("click 2") }}></td>
                                   <td onClick={() => { console.log("click 3") }}></td>
                                   <td onClick={() => { console.log("click 4") }}></td>
                                   <td onClick={() => { console.log("click 5") }}></td>
                                   <td onClick={() => { console.log("click 6") }}></td>
                                   <td onClick={() => { console.log("click 7") }}></td>
                                </tr>
                            </tbody>
                        </table>
               </div>
                <div className='Bottom-left'>                
                    <input onChange={(event) => this.updateName(event)} placeholder="Enter Your Name"></input>


                    <input onChange={(event) => this.updateID(event)} placeholder="Enter Your ID"></input>


                    <input onChange={(event) => this.updateAge(event)} placeholder="Enter Your Age"></input>


                    <input onChange={(event) => this.updateEmail(event)} placeholder="Enter Your Email"></input>

                    <button onClick={() => this.sendUser()}>Send new user to database</button>

                    <h2 style={{ visibility: this.isGreetingVisible }}>Hello {this.state.greeting}</h2>
                </div>
                </body>
        );

    }

}

export default App; 