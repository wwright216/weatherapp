import { PropTypes } from "prop-types";

const payloadType = PropTypes.shape( {
    dt: PropTypes.number,
    temp: PropTypes.oneOfType( [
        PropTypes.number,
        PropTypes.shape( { day: PropTypes.number } ),
    ] ),
    feels_like: PropTypes.oneOfType( [
        PropTypes.number,
        PropTypes.shape( { day: PropTypes.number } ),
    ] ),
    sunrise: PropTypes.number,
    sunset: PropTypes.number,
    weather: PropTypes.arrayOf( PropTypes.shape( {
        icon: PropTypes.string,
        main: PropTypes.string,
    } ) ),
    rain: PropTypes.number,
} );

export default payloadType;
