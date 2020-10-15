import React from 'react';
import { Provider } from 'mobx-react';
import LocationForm from '../components/Weather/LocationForm';
import WeatherResults from "../components/Weather/WeatherResults";
import { Grid } from "semantic-ui-react";

/**
 * @param store
 * @returns {JSX.Element}
 * @constructor
 */
const Weather = ( { store } ) => (
    <Provider weatherStore={ store }>
        <Grid
            divided="vertically"
            centered
            columns={2}
            container
        >
            <Grid.Row
                centered
                columns={3}
            >
                <LocationForm />
            </Grid.Row>
            <Grid.Row
                centered
                columns={3}
            >
                <WeatherResults />
            </Grid.Row>
        </Grid>
    </Provider>
);

export default Weather;
