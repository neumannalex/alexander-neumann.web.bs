import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from '../authProvider';
import Container from 'react-bootstrap/Container';
import BootstrapTable from 'react-bootstrap-table-next';
import Moment from 'react-moment';
import { css } from "@emotion/core";
import { ClipLoader, PulseLoader } from "react-spinners";
import { Col, Row } from 'react-bootstrap';
import { configProvider } from '../configProvider';
import moment from 'moment';

const RunningPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            authProvider.getAccessToken().then(token => {
                var config = {
                    headers: {'Authorization': "bearer " + token.accessToken}
                };

                axios.get(`${configProvider.API_DOMAIN}/api/trainingruns`, config).then(result => {
                    setData(result.data);
                    setIsLoading(false);
                }).catch(error => {
                    setIsLoading(false);
                });
            }).catch(error => {
                setIsLoading(false);
            });
        }

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
                data={data}
                columns={columns}
                striped
                hover
                condensed
                />
        );
    }
};

export default RunningPage;