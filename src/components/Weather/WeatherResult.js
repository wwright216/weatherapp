import React, { useState } from 'react';
import { Button, Card, Grid, Modal } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import WeatherCardContent from './WeatherCard';
import payloadType from './payloadType';

/**
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
const WeatherResult = ( { data } ) => {
    const [ modalOpen, setModalOpen ] = useState( false );

    if ( !data || !data.data ){
        return null;
    }

    const getDaysData = () => data.data.daily.map( ( day ) => (
        <Grid.Column key={ day.dt }>
            <Card>
                <WeatherCardContent
                    payload={ day }
                    description={ data.description }
                    isForForecast
                />
            </Card>
        </Grid.Column>
    ) );


    return (
        <Card>
            <WeatherCardContent
                payload={ data.data.current }
                description={ data.description }
            />
            <Card.Content extra>
                <Modal
                    onClose={ () => setModalOpen( false ) }
                    onOpen={ () => setModalOpen( true ) }
                    open={ modalOpen }
                    trigger={ <Button content="View 8 Day Forecast"/> }
                >
                    <Modal.Header>
                        8 Day Forecast { data.description }
                    </Modal.Header>
                    <Modal.Content>
                        <Grid columns={ 3 }>
                            <Card.Group>
                                { getDaysData() }
                            </Card.Group>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setModalOpen(false)}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Card.Content>
        </Card>
    );
};

WeatherResult.propTypes = {
    data: PropTypes.shape( {
        description: PropTypes.string,
        data: PropTypes.shape( {
            data: PropTypes.shape( {
                current: payloadType,
                days: payloadType,
            } ),
        } ),
    } )
};

export default WeatherResult;
