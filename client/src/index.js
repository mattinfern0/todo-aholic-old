import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import {RootRouter} from './routes';

// Need to import it here or else it won't be included
import ApiMessenger from './controllers/ApiMessenger';


ReactDOM.render(<RootRouter />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
