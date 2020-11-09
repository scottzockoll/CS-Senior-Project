import React from 'react';
import ClientPage from './routes/client/index';
import './App.css';
import Homepage from './routes/home/index';
import NavigationBar from './routes/common/NavigationBar';
import AdminPage from './routes/admin';
import { Route, Switch } from 'react-router-dom';
import { records, sampleRecord } from './ExampleData';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/admin">
                    <NavigationBar />
                    <AdminPage />
                </Route>
                <Route path="/client">
                    <NavigationBar />
                    <ClientPage userRecord={sampleRecord} />
                </Route>
                <Route path="/">
                    <NavigationBar />
                    <Homepage />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
