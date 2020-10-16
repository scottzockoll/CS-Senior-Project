import React from 'react';
import './App.css';
import Homepage from './routes/home/Homepage';
import NavigationBar from './routes/common/NavigationBar';

function App() {
    return (
        <div>
            <NavigationBar />
            <Homepage />
        </div>
    );
}

export default App;
