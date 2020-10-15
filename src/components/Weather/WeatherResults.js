import React from 'react';
import { inject, observer } from 'mobx-react';
import WeatherResult from './WeatherResult';
import { Grid } from 'semantic-ui-react';

const WeatherResults = inject( 'weatherStore' )( observer( ( { weatherStore } ) => {
    if ( weatherStore.allItems.length ) {
        const allWeatherItems = weatherStore.allItems.map( ( weatherItem ) => (
            <Grid.Column key={ weatherItem.zipCode }>
                <WeatherResult data={ weatherItem }/>
            </Grid.Column>
        ) );

        return (
            <Grid
                container
                columns="equal"
            >
                <Grid columns={ 3 }>
                    { allWeatherItems }
                </Grid>
            </Grid>
        )
    }

    return null;
} ) );

export default WeatherResults;
