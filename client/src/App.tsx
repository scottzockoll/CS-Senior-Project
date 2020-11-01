import React from 'react';
import './App.css';
import { Login } from './components/auth/Login';
import { Box } from 'grommet';

class App extends React.Component {
    render() {
        return (
            <Box>
                <Login />
            </Box>
        );
    }
}
export default App;
