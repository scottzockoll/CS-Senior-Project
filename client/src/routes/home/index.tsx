import React from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from '../common/NavigationBar';
import * as serviceWorker from '../../serviceWorker';

ReactDOM.render(<NavigationBar />, document.getElementById('root'));
serviceWorker.unregister();
