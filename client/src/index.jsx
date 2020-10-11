import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { MainView } from './components/main-view/main-view';

import moviesApp from './reducers/reducers';

// Import statement to indicate the need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class BondMovieApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render our app in the root DOM element
ReactDOM.render(React.createElement(BondMovieApp), container);