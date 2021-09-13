import React, { Component } from 'react';
import Map from "./components/Map/index";
import GeoMap from "./components/GeoMap/index";
import './App.css';
import axios from "axios"
import CallTypeChart from "./components/CallTypeChart/index";
import OccurDateChart from "./components/OccurDateChart/index";
import OccurTimeChart from "./components/OccurTimeChart/index";
import TotalPerDayChart from "./components/TotalPerDayChart/index"; 
import geodata from "./data/seattle.geojson";

require('dotenv').config()

class App extends Component { 
  state = {
    sites: [],
    total: [],
    geo: []
  }

  componentDidMount() {
      this.fetchSites()
      this.fetchTotalPerDay()
      this.fetchdata()
  } 

  fetchdata = async () => {
    try {
      const res = await axios.get(geodata);
      this.setState({
        geo: res.data.features
      });
    } catch (error) {
      console.log(error)
    }
  } 

  fetchSites = async () => { 

    const res = await axios.get(`https://data.seattle.gov/resource/kzjm-xkqj.json?$$app_token=${process.env.REACT_APP_APPTOKEN_API_KEY}`)

    this.setState({
      sites: res.data
    })
  }

  

  fetchTotalPerDay = async () => { 

    const res = await axios.get(`https://data.seattle.gov/resource/umiy-nixb.json`)

    this.setState({
      total: res.data.reverse()
    })
  }


  render() {

    let data = {
      geoData: this.state.geo,
      siteData: this.state.sites 
    }

    return (
      <>
        <nav className="nav-wrapper">
          <p className="text-center p-0 text-white" style={{fontWeight: 620, fontSize: "16px"}}>Seattle Real Time Fire 911 Calls Dashboard</p> 
        </nav>

        <TotalPerDayChart results={this.state.total}/>
        <OccurTimeChart results={this.state.sites}/> 
        <OccurDateChart results={this.state.sites}/> 
        <CallTypeChart results={this.state.sites}/> 
        <div className="card mb-0 pb-0"> 
                <Map results={this.state.sites}/> 
        </div>

        <div className="card mb-0 pb-0"> 
                <GeoMap results={data}/> 
        </div>
      </>
    )
  }
}

export default App; 
