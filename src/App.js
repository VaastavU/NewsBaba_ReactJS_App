import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
    const pageSize = 12;
    const apiKey = process.env.REACT_APP_API_KEY;
    const [progress, setProgress] = useState(0);

    return (
        <div>
            <Router>
                <Navbar />
                <LoadingBar color='#f11946' height={3} progress={progress} />
                <Routes>
                    <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} key='home' pageSize={pageSize} country='in' category='general' />} />
                    <Route exact path='/Business' element={<News setProgress={setProgress} apiKey={apiKey} key='Business' pageSize={pageSize} country='in' category='business' />} />
                    <Route exact path='/Entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key='Entertainment' pageSize={pageSize} country='in' category='entertainment' />} />
                    <Route exact path='/General' element={<News setProgress={setProgress} apiKey={apiKey} key='General' pageSize={pageSize} country='in' category='general' />} />
                    <Route exact path='/Health' element={<News setProgress={setProgress} apiKey={apiKey} key='Health' pageSize={pageSize} country='in' category='health' />} />
                    <Route exact path='/Science' element={<News setProgress={setProgress} apiKey={apiKey} key='Science' pageSize={pageSize} country='in' category='science' />} />
                    <Route exact path='/Sports' element={<News setProgress={setProgress} apiKey={apiKey} key='Sports' pageSize={pageSize} country='in' category='sports' />} />
                    <Route exact path='/Technology' element={<News setProgress={setProgress} apiKey={apiKey} key='Technology' pageSize={pageSize} country='in' category='technology' />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;



