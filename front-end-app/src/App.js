import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import HospitalForm from './HospitalForm'
import './App.css';

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

  handleSubmit(event) {
    
    fetch("/get_occupancy/" + this.state.value).then(res => res.json()).then(data =>
        {
            this.setState(
              {
                message: data + " vacancies"
              }
            )
        }
      )
      event.preventDefault();
  }

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
