import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import HospitalForm from './HospitalForm'
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: '', message: 'Your occupancy data will appear here'}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
      this.setState({value: event.target.value});
  }

  // need to make it async??
  handleSubmit(event) {
    axios.get("http://0.0.0.0:5000/get_occupancy",
      {params: {'zipcode': this.state.value}}
      )
    .then((response) => {
        this.setState({message: response.data});  
        console.log(response);  
      }, (error) => {
        console.log(error);
      }
    )
    event.preventDefault();
  }

  // handleSubmit(event) {
    
  //   fetch("http://localhost:5000/get_occupancy/").then(res => res.json()).then(data =>
  //       {
  //           this.setState(
  //             {
  //               message: data + " vacancies"
  //             }
  //           )
  //       }
  //     )
  //     event.preventDefault();
  // }

  render () {
    return (
      <div className="App">
        <header className="App-header">
        <form onSubmit={this.handleSubmit}>
              <label>
                  Insert Hospital Zip Code:
                  <input type="text" value={this.state.value} onChange={this.handleChange}/>
              </label>
              <input type="submit" value="Submit" />
              </form>
              <p>
                  {this.state.message} 
              </p>
        </header>
      </div>
    );
  }
  
  
}

export default App;
