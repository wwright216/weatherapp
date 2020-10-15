import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Home from './components/Home';
import { Header } from 'semantic-ui-react';
import WeatherStore from "./stores/Weather";

const styles = {
    app: {
        margin: '3em',
    },
    header: {
        marginBottom: '2em',
    },
};

const weatherStore = new WeatherStore();

function App() {
  return (
    <div style={ styles.app }>
        <Header
            as="h1"
            content="Wade's Weather App"
            textAlign="center"
            style={ styles.header }
        />
        <Home store={ weatherStore } />
    </div>
  );
}

export default App;
