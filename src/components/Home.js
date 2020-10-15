import React from 'react';
import Weather from '../containers/Weather';
import { Grid } from "semantic-ui-react";

/**
 * @param store
 * @returns {JSX.Element}
 * @constructor
 */
const Home = ( { store } ) => (
    <Grid
        container
        columns={2}
        stackable
        verticalAlign="middle"
    >
        <Weather store={ store }/>
    </Grid>
);

export default Home;
