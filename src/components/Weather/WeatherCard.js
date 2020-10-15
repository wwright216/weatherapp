import React from 'react';
import moment from 'moment';
import { Card, Icon } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import payloadType from './payloadType';

/**
 * @param payload
 * @param description
 * @param isForForecast
 * @returns {JSX.Element|null}
 * @constructor
 */
const WeatherCardContent = ( { payload, description, isForForecast = true } ) => {
    const parseTemp = ( temp ) => ( +temp ).toFixed( 0 );
    const getDay = () => moment.unix( payload.dt ).format('dddd MMMM Do, YYYY');
    const getTemp = () => isForForecast ? parseTemp( payload.temp.day ) : parseTemp( payload.temp );
    const getFeelsLike = () => isForForecast ? parseTemp( payload.feels_like.day ) : parseTemp( payload.feels_like );
    const getHumidity = () => payload.humidity;
    const getSunriseTime = () => moment.unix( payload.sunrise ).format('LTS');
    const getSunsetTime = () => moment.unix( payload.sunset ).format('LTS');
    const getSummaryWithImage = () => ( <><img src={ `https://openweathermap.org/img/w/${ payload.weather[ 0 ].icon }.png` } alt="status"/>{ payload.weather[ 0 ].main } </>);
    const getRainChance = () => `${ +( payload.rain * 100 ).toFixed( 0 ) || 0 }%`;

    if ( !payload ){
        return null;
    }

    const getCurrentVerbiage = () => isForForecast ? '' : 'Current';
    const getMidDayVerbiage = () => !isForForecast ? '' : 'Mid day';

    return (
        <Card.Content>
            <Card.Header>
                { getDay() }
            </Card.Header>
            <Card.Header>
                { description }
            </Card.Header>
            <Card.Meta>
                { getSummaryWithImage() }
            </Card.Meta>
            <Card.Meta>
                Chance of rain: { getRainChance() }
            </Card.Meta>
            <Card.Description>
                { getCurrentVerbiage() }{ getMidDayVerbiage() } temp: { getTemp() }&#8457;
            </Card.Description>
            <Card.Description>
                { getCurrentVerbiage() }{ getMidDayVerbiage() } feels like: { getFeelsLike() }&#8457; with { getHumidity() }% humidity
            </Card.Description>
            <Card.Meta>
                Sunrise: { getSunriseTime() }&nbsp;<Icon name="sun outline"/>
            </Card.Meta>
            <Card.Meta>
                Sunset: { getSunsetTime() }&nbsp;<Icon name="moon outline"/>
            </Card.Meta>
        </Card.Content>
    );
};

WeatherCardContent.propTypes = {
    description: PropTypes.string.isRequired,
    payload: payloadType.isRequired,
    isForForecast: PropTypes.bool,
}

export default WeatherCardContent;
