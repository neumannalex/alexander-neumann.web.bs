import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authProvider } from '../../authProvider';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Col, Row, Button, Container } from 'react-bootstrap';
import { configProvider } from '../../configProvider';
import LoadingOverlay from 'react-loading-overlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

import AddRunComponent from './AddRunComponent';
import RunningChartComponent from './RunningChartComponent';
import RunningStatsComponent from './RunningStatsComponent';
import RunningListComponent from './RunningListComponent';

const RunningPage = (props) => {
    const [data, setData] = useState({
        userId: "",
        items: [],
        total: 0,
        averageSpeedInKilometersPerHour: 0,
        minimumSpeedInKilometersPerHour: 0,
        maximumSpeedInKilometersPerHour: 0,
        averagePaceInMinutesPerKilometer: {
            ticks: 0,
            days: 0,
            hours: 0,
            milliseconds: 0,
            minutes: 0,
            seconds: 0,
            totaldays: 0,
            totalhours: 0,
            totalmilliseconds: 0,
            totalminutes: 0,
            totalseconds: 0
        },
        maximumPaceInMinutesPerKilometer: {
            ticks: 0,
            days: 0,
            hours: 0,
            milliseconds: 0,
            minutes: 0,
            seconds: 0,
            totaldays: 0,
            totalhours: 0,
            totalmilliseconds: 0,
            totalminutes: 0,
            totalseconds: 0
        },
        minimumPaceInMinutesPerKilometer: {
            ticks: 0,
            days: 0,
            hours: 0,
            milliseconds: 0,
            minutes: 0,
            seconds: 0,
            totaldays: 0,
            totalhours: 0,
            totalmilliseconds: 0,
            totalminutes: 0,
            totalseconds: 0
        },
        averageDistanceInMeters: 0,
        minimumDistanceInMeters: 0,
        maximumDistanceInMeters: 0,
        totalDistanceInMeters: 0,
        averageDuration: {
            ticks: 0,
            days: 0,
            hours: 0,
            milliseconds: 0,
            minutes: 0,
            seconds: 0,
            totaldays: 0,
            totalhours: 0,
            totalmilliseconds: 0,
            totalminutes: 0,
            totalseconds: 0
        },
        minimumDuration: {
            ticks: 0,
            days: 0,
            hours: 0,
            milliseconds: 0,
            minutes: 0,
            seconds: 0,
            totaldays: 0,
            totalhours: 0,
            totalmilliseconds: 0,
            totalminutes: 0,
            totalseconds: 0
        },
        maximumDuration: {
            ticks: 0,
            days: 0,
            hours: 0,
            milliseconds: 0,
            minutes: 0,
            seconds: 0,
            totaldays: 0,
            totalhours: 0,
            totalmilliseconds: 0,
            totalminutes: 0,
            totalseconds: 0
        },
        totalDuration: {
            ticks: 0,
            days: 0,
            hours: 0,
            milliseconds: 0,
            minutes: 0,
            seconds: 0,
            totaldays: 0,
            totalhours: 0,
            totalmilliseconds: 0,
            totalminutes: 0,
            totalseconds: 0
        },
        averageEnergyInKCal: 0,
        minimumEnergyInKCal: 0,
        maximumEnergyInKCal: 0,
        totalEnergyInKCal: 0
      });

    const [isLoading, setIsLoading] = useState(false);

    const fetchData = () => {
        setIsLoading(true);

        authProvider.getAccessToken().then(token => {
            var config = {
                headers: {'Authorization': "bearer " + token.accessToken}
            };

            axios.get(`${configProvider.API_DOMAIN}/api/trainingruns/statistics`, config).then(result => {
                setData(result.data);
                setIsLoading(false);
            }).catch(error => {
                setIsLoading(false);
            });
        }).catch(error => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <LoadingOverlay
            active={isLoading}
            spinner
            text='Lade Daten...'>
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <h2>Lauftraining <FontAwesomeIcon icon={faSync} onClick={() => fetchData()} size="sm" style={{cursor: 'pointer'}} /></h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Tabs defaultActiveKey="stats" id="running-tabs">
                            <Tab eventKey="stats" title="Statistik">
                                <RunningStatsComponent data={data} />
                            </Tab>
                            <Tab eventKey="list" title="Liste">
                                <RunningListComponent data={data} />
                            </Tab>
                            <Tab eventKey="charts" title="Chart">
                                <RunningChartComponent data={data} />
                            </Tab>
                            <Tab eventKey="addRun" title="Training hinzufügen">
                                <AddRunComponent reloadCallback={fetchData} />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </LoadingOverlay>
    );
};


export default RunningPage;
