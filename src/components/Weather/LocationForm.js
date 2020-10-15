import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';

const styles = {
    error: {
        color: 'red',
    },
};

const LocationForm = inject( 'weatherStore' )( observer( ({ weatherStore } ) => {
    const [ error, setError ] = useState( null );
    const handleSubmit = ( event ) => {
        event.preventDefault();
        const zipCode = event.target[ 0 ].value;
        const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        const openWeatherMapAppId  = process.env.REACT_APP_OPEN_WEATHER_MAP_APP_ID;

        if ( !googleMapsApiKey || !openWeatherMapAppId ) {
            setError( 'You need to set up your keys / app id' );

            return false;
        }

        if (weatherStore.allItems.filter( item => item.zipCode === zipCode ).length) {
            setError( 'You have already searched for this location' );

            return false;
        }

        if ( zipCode ) {
            fetch( `https://maps.googleapis.com/maps/api/geocode/json?address=${ zipCode }&sensor=false&key=${ googleMapsApiKey }` )
                .then( response => response.json() )
                .then( ( response ) => {
                    if (response.status === 'OK' && response.results) {
                        const realResult = response.results[ 0 ];
                        const location = realResult.geometry.location;
                        const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${ location.lat }&lon=${ location.lng }&units=imperial&APPID=${ openWeatherMapAppId }`;

                        fetch( weatherUrl )
                            .then( response => response.json() )
                            .then( ( response ) => {
                                const getDescription = () => {
                                    const city = realResult.address_components.find( ( component ) => component.types.includes( 'postal_town' ) )
                                        || realResult.address_components.find( ( component ) => component.types.includes( 'locality' ) ) ;
                                    const stateProvince = realResult.address_components.find( ( component ) => component.types.includes( 'administrative_area_level_1' ) );
                                    const country = realResult.address_components.find( ( component ) => component.types.includes( 'country' ) );

                                    return `${ city ? city.short_name : '' }, ${ stateProvince ? stateProvince.short_name : '' } ${ country ? country.short_name : '' }`;
                                };

                                weatherStore.addItem( {
                                    description: getDescription(),
                                    zipCode: zipCode,
                                    data: response,
                                } );
                            } );
                    } else {
                        setError( 'Invalid Postal Code' );
                    }
                } );
        } else {
            setError( 'Enter a valid Postal Code' );
        }
    };

    return (
        <form onSubmit={ handleSubmit }>
            <Input
                label="Postal Code"
                placeholder="Search by postal code..."
                onChange={ () => setError( null ) }
            />
            <Button
                type="submit"
                primary
            >
                Get Weather!
            </Button>
            { !!error && ( <div style={ styles.error }>{ error }</div> ) }
        </form>
    );
} ) );

export default LocationForm;
