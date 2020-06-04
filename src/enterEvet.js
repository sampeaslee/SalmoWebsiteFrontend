import React, { Component }from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import './App.css'



export default class AlertDismissible extends React.Component {
    state = {
        toDO: "",
    
    }
     updateToDo = (event) => {
         event.preventDefault();
         
         this.setState({ toDO: event.target.value })
    }
    changeVis = () => {
        this.setState({ vis: false })
    }

    sendEventToDataBase = async () => {
        fetch("http://localhost:8080/SalmoEvent", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event: this.state.toDO,

            })
        });
    }
     render() {


         return (
             <div className="Alert" >
                 < Alert show={this.props.vis} variant="success"  >
                     <div className='Alert-2'>
                 <Alert.Heading>Add an Event</Alert.Heading>
                    
                         <input onChange={(event) => this.updateToDo(event)} placeholder="Enter Event"
                             className='TextInput'></input>
                     </div>
                     <div className= 'Button-layout'>
                         <Button onClick={this.props.onPress} className='Button-exit' >Exit</Button>{' '}

                         <Button onClick={this.sendEventToDataBase} className='Button-add' >Submit</Button>{' '}
                        </div>
                 </Alert >
                 </div>
         );
        }
    }

