import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Moment from 'react-moment';
import { Col, Row, Button } from 'react-bootstrap';
import moment from 'moment';

const RunningStatsComponent = ({data}) => {
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

export default RunningStatsComponent;