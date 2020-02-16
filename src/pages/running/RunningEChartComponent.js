import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Button } from 'react-bootstrap';
import moment from 'moment';
import { ResponsiveLine } from '@nivo/line';
import ReactEcharts from 'echarts-for-react';

const RunningEChartComponent = ({data}) => {
    //console.log('data', data);

    var totalDistanceSeries = [];
    var totalEnergySeries = [];
    var totalDurationSeries = [];
    var speedSeries = [];
    var paceSeries = [];
    var durationSeries = [];
    var distanceSeries = [];
    var energySeries = [];

    if(Array.isArray(data.items))
    {

        data.items.forEach((value, index) => {
            var slice = data.items.slice(0, index + 1);
            
            var date = moment(value.trainingDate);
            var totalDistance = 0;
            var totalEnergy = 0;
            var totalDurationInMSec = 0;
            
            slice.forEach((item) => {
                totalDistance += item.distanceInMeters;
                totalEnergy += item.energyInKCal;
                totalDurationInMSec += item.duration.totalMilliseconds;
            });

            totalDistanceSeries.push([
                date.format('YYYY-MM-DD'),
                (Math.round(totalDistance / 1000 * 100)/100).toFixed(2)
            ]);

            totalEnergySeries.push([
                date.format('YYYY-MM-DD'),
                (Math.round(totalEnergy * 100)/100).toFixed(2)
            ]);

            totalDurationSeries.push([
                date.format('YYYY-MM-DD'),
                (Math.round(totalDurationInMSec * 100)/100).toFixed(2)
            ]);
        });

        speedSeries = data.items.map((item) => {
            var date = moment(item.trainingDate);
            return [
                date.format('YYYY-MM-DD'),
                (Math.round(item.averageSpeedInKilometersPerHour * 100)/100).toFixed(2)
            ];
        });

        paceSeries = data.items.map((item) => {
            var date = moment(item.trainingDate);
            var durationInMSec = item.averagePacePerKilometer.totalMilliseconds;

            return [
                date.format('YYYY-MM-DD'),
                durationInMSec
            ];
        });

        durationSeries = data.items.map((item) => {
            var date = moment(item.trainingDate);
            var durationInMSec = item.duration.totalMilliseconds;

            return [
                date.format('YYYY-MM-DD'),
                durationInMSec
            ];
        });

        distanceSeries = data.items.map((item) => {
            var date = moment(item.trainingDate);
            return [
                date.format('YYYY-MM-DD'),
                (Math.round(item.distanceInMeters / 1000 * 100)/100).toFixed(2)
            ];
        });

        energySeries = data.items.map((item) => {
            var date = moment(item.trainingDate);
            return [
                date.format('YYYY-MM-DD'),
                (Math.round(item.energyInKCal * 100)/100).toFixed(0)
            ];
        });
        
    }

    const option = {
        title: {
            text: 'Trainingsverlauf',
            left: 'center',
            top: 0
        },
        grid: [{
            top: '5%',
            height: '40%',
            width: '75%',
            left: '15%'
        },
        {
            bottom: '10%',
            height: '40%',
            width: '75%',
            left: '15%'
        }],
        xAxis: [
            {
                gridIndex: 0,
                type: 'time',
                axisLabel: {
                    formatter: function (value, index) {
                        var date = new moment(value);
                        return date.format('DD.MM.YYYY');
                    }
                }
            },
            {
                gridIndex: 1,
                type: 'time',
                axisLabel: {
                    formatter: function (value, index) {
                        var date = new moment(value);
                        return date.format('DD.MM.YYYY');
                    }
                }
            }
        ],
        yAxis: [
            {
                gridIndex: 0,
                name: 'Speed und Distanz',
                nameLocation: 'center',
                nameRotate: 90,
                type: 'value',
                position: 'left'
            },
            {
                gridIndex: 0,
                name: 'Pace und Dauer',
                nameLocation: 'center',
                nameRotate: 90,
                nameGap: 45,
                type: 'value',
                position: 'left',
                offset: 50,
                axisLabel: {
                    formatter: function (value, index) {
                        var date = new moment.duration(value);
                        return date.format('h:mm:ss');
                    }
                },
                min: function(value) {
                    var minutes = moment.duration(value.min).asMinutes();
                    
                    return (Math.floor(minutes) - 1) * 60 * 1000;
                },
                max: function(value) {
                    var minutes = moment.duration(value.max).asMinutes();
                    
                    return (Math.ceil(minutes) + 1) * 60 * 1000;
                },
                splitLine: {
                    show: false
                }
            },
            {
                gridIndex: 0,
                name: 'Energie',
                nameLocation: 'center',
                nameRotate: 90,
                nameGap: 45,
                type: 'value',
                position: 'left',
                offset: 140
            },
            {
                gridIndex: 1,
                name: 'Distanz',
                nameLocation: 'center',
                nameRotate: 90,
                //nameGap: 45,
                type: 'value',
                position: 'left'
            },
            {
                gridIndex: 1,
                name: 'Dauer',
                nameLocation: 'center',
                nameRotate: 90,
                nameGap: 55,
                type: 'value',
                position: 'left',
                offset: 50,
                axisLabel: {
                    formatter: function (value, index) {
                        var date = new moment.duration(value);
                        return date.format('h:mm:ss');
                    }
                },
                min: function(value) {
                    var minutes = moment.duration(value.min).asMinutes();
                    
                    return (Math.floor(minutes) - 1) * 60 * 1000;
                },
                max: function(value) {
                    var minutes = moment.duration(value.max).asMinutes();
                    
                    return (Math.ceil(minutes) + 1) * 60 * 1000;
                },
                splitLine: {
                    show: false
                }
            },
            {
                gridIndex: 1,
                name: 'Energie',
                nameLocation: 'center',
                nameRotate: 90,
                nameGap: 45,
                type: 'value',
                position: 'left',
                offset: 140
            },
        ],
        dataZoom: [
            {
                show: true, 
                xAxisIndex: [0, 1]
            }
        ],
        legend: {
            show: true,
            orient: 'vertical',
            top: '5%',
            right: 'left',
            align: 'left'
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    show: false
                }
            },
            formatter: function (params, ticket, callback) {
                var date = new moment(params[0].data[0]);
                var tip = date.format('DD.MM.YYYY') + '<br />';
                
                var items = params.map((item) => {
                    var value = item.data[1];

                    switch(item.seriesIndex) {
                        case 2:
                            value = moment.duration(value).format('h:mm:ss');
                            break;
                        case 3:
                            value = moment.duration(value).format('h:mm:ss');
                            break;
                        case 6:
                            value = moment.duration(value / 60000, 'minutes').format('h:mm:ss');
                            break;
                    }
                    return '<tr><td>' + item.marker + '</td><td>' + item.seriesName + '</td><td>' + value + '</td></tr>';
                });

                return tip + '<table>' +  items.join('\n') + '</table>';
            }
        },
        toolbox: {
            feature: {
                dataZoom: {
                    title: {
                        zoom: 'Zoomauswahl an/aus',
                        back: 'Zoomauswahl zurücksetzen'
                    },
                    yAxisIndex: 'none'
                },
                restore: {
                    title: 'Ansicht zurücksetzen'
                },
                saveAsImage: {
                    title: 'Als Bild speichern'
                }
            }
        },
        series: [
            { 
                data: speedSeries,
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                name: 'Speed [km/h]',
                hoverAnimation: false
            },
            { 
                data: distanceSeries,
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                name: 'Distanz [km]',
                hoverAnimation: false
            },
            { 
                data: paceSeries,
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 1,
                name: 'Pace [min/km]',
                hoverAnimation: false
            },
            { 
                data: durationSeries,
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 1,
                name: 'Dauer [hh:mm:ss]',
                hoverAnimation: false
            },
            { 
                data: energySeries,
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 2,
                name: 'Energie [kCal]',
                hoverAnimation: false
            },
            { 
                data: totalDistanceSeries,
                type: 'line',
                xAxisIndex: 1,
                yAxisIndex: 3,
                name: 'Kum. Distanz [km]',
                hoverAnimation: false
            },
            { 
                data: totalDurationSeries,
                type: 'line',
                xAxisIndex: 1,
                yAxisIndex: 4,
                name: 'Kum. Dauer',
                hoverAnimation: false
            },
            { 
                data: totalEnergySeries,
                type: 'line',
                xAxisIndex: 1,
                yAxisIndex: 5,
                name: 'Kum. Energie [kCal]',
                hoverAnimation: false
            }
        ]
    };

    return (
        <Container fluid>
            <Row>
                <Col>
                    <ReactEcharts
                        style={{height: '80vh'}}
                        option={option}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default RunningEChartComponent;