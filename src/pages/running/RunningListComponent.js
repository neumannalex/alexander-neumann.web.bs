import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Moment from 'react-moment';
import { Col, Row, Button } from 'react-bootstrap';
import moment from 'moment';

const RunningListComponent = ({data}) => {
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

export default RunningListComponent;
