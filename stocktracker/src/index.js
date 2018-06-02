import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Particles from 'react-particles-js';

const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area:800
            }
        }
    }
};

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
