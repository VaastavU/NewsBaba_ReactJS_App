import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";


export default class App extends Component {
    pagesize = 12;
    apiKey = process.env.API_KEY_REACT_NEWSAPP
    state = {
        progress: 0
    }
    setProgress = (progress) => {
        this.setState({ progress: progress })
    }
    render() {
        return (
            <div>
                <Router>
                    <Navbar />
                    <LoadingBar color='#f11946' height = {3} progress={this.state.progress} />
                    <Routes>
                        <Route exact path='/' element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key='home' pageSize={this.pagesize} country='in' category='general' />} />
                        <Route exact path='/Business' element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key='Business' pageSize={this.pagesize} country='in' category='business' />} />
                        <Route exact path='/Entertainment' element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key='Entertainment' pageSize={this.pagesize} country='in' category='entertainment' />} />
                        <Route exact path='/General' element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key='General' pageSize={this.pagesize} country='in' category='general' />} />
                        <Route exact path='/Health' element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key='Health' pageSize={this.pagesize} country='in' category='health' />} />
                        <Route exact path='/Science' element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key='Science' pageSize={this.pagesize} country='in' category='science' />} />
                        <Route exact path='/Sports' element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key='Sports' pageSize={this.pagesize} country='in' category='sports' />} />
                        <Route exact path='/Technology' element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key='Technology' pageSize={this.pagesize} country='in' category='technology' />} />
                    </Routes>
                </Router>

            </div>
        );
    }
}