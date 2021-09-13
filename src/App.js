import React, { Component } from 'react';
import Map from "./components/Map/index";
import './App.css';
import axios from "axios"
import CallTypeChart from "./components/CallTypeChart/index";
import OccurDateChart from "./components/OccurDateChart/index";
import OccurTimeChart from "./components/OccurTimeChart/index";

require('dotenv').config()

class App extends Component { 
  state = {
    sites: []
  }

  componentDidMount() {
      this.fetchSites()
  } 


  fetchSites = async () => { 

    const res = await axios.get(`https://data.seattle.gov/resource/kzjm-xkqj.json?$$app_token=${process.env.REACT_APP_APPTOKEN_API_KEY}`)

    this.setState({
      sites: res.data
    })
  }




  render() {
    return (
      <>
        <nav className="nav-wrapper">
          <p className="text-center p-0 text-white" style={{fontWeight: 620, fontSize: "16px"}}>Seattle Real Time Fire 911 Calls Dashboard</p> 
        </nav>

        <OccurTimeChart results={this.state.sites}/> 
        <OccurDateChart results={this.state.sites}/> 
        <CallTypeChart results={this.state.sites}/> 
        <div className="card mb-0 pb-0"> 
                <Map results={this.state.sites}/> 
        </div>
      </>
    )
  }
}

export default App; 
