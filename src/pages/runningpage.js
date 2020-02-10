import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from '../authProvider';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert'
import BootstrapTable from 'react-bootstrap-table-next';
import Moment from 'react-moment';
import { css } from "@emotion/core";
import { ClipLoader, PulseLoader } from "react-spinners";
import { Col, Row, Button } from 'react-bootstrap';
import { configProvider } from '../configProvider';
import moment from 'moment';
import { ResponsiveLine } from '@nivo/line';
import { useFormik } from 'formik';

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


    if(isLoading) {
        return (
            <PulseLoader
                size={15}
                margin={2}
                color={"#36D7B7"}
                loading={isLoading}
            />
        );
    }
    else {
        return (
            <div>
            <Button onClick={() => this.fetchData()}>Aktualisieren</Button>
            <Tabs defaultActiveKey="stats" id="running-tabs">
                <Tab eventKey="stats" title="Statistik">
                    <StatsTableView data={data} />
                </Tab>
                <Tab eventKey="list" title="Liste">
                    <RunsTableView data={data} />
                </Tab>
                <Tab eventKey="charts" title="Chart">
                    <ChartView data={data} />
                </Tab>
                <Tab eventKey="addRun" title="Training hinzufügen">
                    <AddRunView />
                </Tab>
            </Tabs>
            </div>
        );
    }
};

const AddRunView = () => {
    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const formik = useFormik({
        initialValues: {
             trainingDate: moment().format('YYYY-MM-DD'),
             duration: '00:35:00',
             distance: '5000',
             energy: '500'
        },
        onSubmit: values => {
            const postData = {
                trainingDate: moment.utc(values.trainingDate).toISOString(),
                durationInSeconds: moment.duration(values.duration).asSeconds(),
                distanceInMeters: Math.round(values.distance),
                energyInKCal: Math.round(values.energy)
            }

            authProvider.getAccessToken().then(token => {
                var config = {
                    headers: {'Authorization': "bearer " + token.accessToken}
                };

                axios.post(`${configProvider.API_DOMAIN}/api/trainingruns`, postData, config).then(result => {
                    setMessage(<Alert variant="success" onClose={() => setShowMessage(false)} dismissible>Training gespeichert</Alert>);
                    setShowMessage(true);
                }).catch(error => {
                    var reason = "Bad request";
                    if(error.response) {
                        console.log('response', error.response);
                        if(error.response.data.title) {
                            console.log('response.title', error.response.data.title);
                            reason = error.response.data.title;
                        }
                    }
                    setMessage(<Alert variant="danger" onClose={() => setShowMessage(false)} dismissible>{reason}</Alert>);
                    setShowMessage(true);
                });
            }).catch(error => {
                setMessage(<Alert variant="danger" onClose={() => setShowMessage(false)} dismissible>Authentication failed</Alert>);
                setShowMessage(true);
            });
        }
    });

    return (
        <Container>
            {
                showMessage && message
            }
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Trainingsdatum</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text"
                        id="trainingDate"
                        name="trainingDate"
                        value={formik.values.trainingDate}
                        onChange={formik.handleChange}
                        placeholder={moment().format('YYYY-MM-DD')} />
                        <Form.Text className="text-muted">Tag des Trainings in [YYYY-MM-DD]</Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">Trainingsdauer</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text"
                        id="duration"
                        name="duration"
                        value={formik.values.duration}
                        onChange={formik.handleChange}
                        placeholder="35:00" />
                        <Form.Text className="text-muted">Dauer des Trainings in Stunden (optional), Minuten und Sekunden [h:mm:ss]</Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">Distanz</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text"
                        id="distance"
                        name="distance"
                        value={formik.values.distance}
                        onChange={formik.handleChange}
                        placeholder="5000" />
                        <Form.Text className="text-muted">Zurückgelegte Distanz in [m]</Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">Energie</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text"
                        id="energy"
                        name="energy"
                        value={formik.values.energy}
                        onChange={formik.handleChange}
                        placeholder="500" />
                        <Form.Text className="text-muted">Verbrauchte Energie in [kCal]</Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Speichern</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}

const ChartView = ({data}) => {

    const series1 = [
        {
            id: "Geschwindigkeit [km/h]",
            data: data.items.map((item) => {
                var date = moment(item.trainingDate);
                return {
                    x: date.format('YYYY-MM-DD'),
                    y: (Math.round(item.averageSpeedInKilometersPerHour * 100)/100).toFixed(2)
                }
            })
        },
        {
            id: "Distanz [km]",
            data: data.items.map((item) => {
                var date = moment(item.trainingDate);
                return {
                    x: date.format('YYYY-MM-DD'),
                    y: (Math.round(item.distanceInMeters / 1000 * 100)/100).toFixed(2)
                }
            })
        }
    ];

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div style={{height: '500px'}}>
                        <ResponsiveLine
                            data={series1}
                            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                            xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
                            xFormat='time:%Y-%m-%d'
                            yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                //legend: 'Datum',
                                format: '%b %d',
                                tickValues: 'every 2 days',
                                tickRotation: -60,
                                legendOffset: 50,
                                legendPosition: 'middle'
                            }}
                            axisLeft={{
                                orient: 'left',
                                legend: 'Distanz und Geschwindigkeit',
                                legendOffset: -40,
                                legendPosition: 'middle'
                            }}
                            colors={{ scheme: 'nivo' }}
                            pointSize={5}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor' }}
                            pointLabel="y"
                            pointLabelYOffset={-12}
                            useMesh={true}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 0,
                                    translateY: -15,
                                    itemsSpacing: 0,
                                    itemDirection: 'left-to-right',
                                    itemWidth: 100,
                                    itemHeight: 20,
                                    itemOpacity: 0.75,
                                    symbolSize: 12,
                                    symbolShape: 'circle',
                                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemBackground: 'rgba(0, 0, 0, .03)',
                                                itemOpacity: 1
                                            }
                                        }
                                    ]
                                }
                            ]}
                            motionStiffness={300}
                            motionDamping={30}
                            enableSlices='x'
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

const StatsTableView = ({data}) => {
    const columns = [{
        dataField: 'caption',
        text: '',
        align: 'center',
        headerAlign: 'center'
    },{
        dataField: 'min',
        text: 'Minimum',
        align: 'center',
        headerAlign: 'center'
    },{
        dataField: 'max',
        text: 'Maximum',
        align: 'center',
        headerAlign: 'center'
    },{
        dataField: 'avg',
        text: 'Durchschnitt',
        align: 'center',
        headerAlign: 'center'
    },{
        dataField: 'total',
        text: 'Total',
        align: 'center',
        headerAlign: 'center'
    }];

    const stats = [{
        id: 0,
        caption: 'Trainingseinheiten',
        min: '-',
        max: '-',
        avg: '-',
        total: data.total
    },{
        id: 1,
        caption: 'Speed [km/h]',
        min: (Math.round(data.minimumSpeedInKilometersPerHour * 100)/100).toFixed(2),
        max: (Math.round(data.maximumSpeedInKilometersPerHour * 100)/100).toFixed(2),
        avg: (Math.round(data.averageSpeedInKilometersPerHour * 100)/100).toFixed(2),
        total: '-'
    },{
        id: 2,
        caption: 'Pace [min/km]',
        min: moment.duration(data.minimumPaceInMinutesPerKilometer.totalMilliseconds).format("mm:ss"),
        max: moment.duration(data.maximumPaceInMinutesPerKilometer.totalMilliseconds).format("mm:ss"),
        avg: moment.duration(data.averagePaceInMinutesPerKilometer.totalMilliseconds).format("mm:ss"),
        total: '-'
    },{
        id: 3,
        caption: 'Distanz [km]',
        min: (Math.round(data.minimumDistanceInMeters / 1000 * 100)/100).toFixed(2),
        max: (Math.round(data.maximumDistanceInMeters / 1000 * 100)/100).toFixed(2),
        avg: (Math.round(data.averageDistanceInMeters / 1000 * 100)/100).toFixed(2),
        total: (Math.round(data.totalDistanceInMeters / 1000 * 100)/100).toFixed(2)
    },{
        id: 4,
        caption: 'Dauer [hh:mm:ss]',
        min: moment.duration(data.minimumDuration.totalMilliseconds).format("h:mm:ss"),
        max: moment.duration(data.maximumDuration.totalMilliseconds).format("h:mm:ss"),
        avg: moment.duration(data.averageDuration.totalMilliseconds).format("h:mm:ss"),
        total: moment.duration(data.totalDuration.totalMilliseconds).format("h:mm:ss")
    },{
        id: 5,
        caption: 'Energie [kCal]',
        min: (Math.round(data.minimumEnergyInKCal * 100)/100).toFixed(2),
        max: (Math.round(data.maximumEnergyInKCal * 100)/100).toFixed(2),
        avg: (Math.round(data.averageEnergyInKCal * 100)/100).toFixed(2),
        total: (Math.round(data.totalEnergyInKCal * 100)/100).toFixed(2)
    }];

    return (
        <BootstrapTable
            keyField='id'
            data={stats}
            columns={columns}
            striped
            hover
            />
    );
}

const RunsTableView = ({data}) => {
    const columns = [{
        dataField: 'trainingDate',
        text: 'Datum',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
            return <Moment format="DD.MM.YYYY">{cell}</Moment>;
        },
        sort: true
    }, {
        dataField: 'trainingCalendarWeek',
        text: 'Kalenderwoche',
        align: 'center',
        headerAlign: 'center',
        sort: true
    }, {
        dataField: 'duration.totalMilliseconds',
        text: 'Dauer',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
            return moment.duration(cell).format("h:mm:ss");
        },
        sort: true
    }, {
        dataField: 'distanceInMeters',
        text: 'Distanz [km]',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
            return cell / 1000;
        },
        sort: true
    }, {
        dataField: 'energyInKCal',
        text: 'Energie [kCal]',
        align: 'center',
        headerAlign: 'center',
        sort: true
    }, {
        dataField: 'averageSpeedInKilometersPerHour',
        text: 'Speed [km/h]',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
            return (Math.round(cell * 100)/100).toFixed(2);
        },
        sort: true
    }, {
        dataField: 'averagePacePerKilometer.totalMilliseconds',
        text: 'Pace [min/km]',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
            return moment.duration(cell).format("mm:ss");
        },
        sort: true
    }];

    return (
        <BootstrapTable
            keyField='id'
            data={data.items}
            columns={columns}
            striped
            hover
            />
    );
}

export default RunningPage;
