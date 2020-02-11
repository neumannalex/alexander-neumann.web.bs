import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Button } from 'react-bootstrap';
import moment from 'moment';
import { ResponsiveLine } from '@nivo/line';
import ReactEcharts from 'echarts-for-react';

const RunningEChartComponent = ({data}) => {

    const xData = data.items.map((item) => {
        var date = moment(item.trainingDate);
        return date.format('YYYY-MM-DD');
    });

    const speedSeries = data.items.map((item) => {
        return (Math.round(item.averageSpeedInKilometersPerHour * 100)/100).toFixed(2);
    });

    const distanceSeries = data.items.map((item) => {
        return (Math.round(item.distanceInMeters / 1000 * 100)/100).toFixed(2);
    });

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
                    <ReactEcharts
                        option={{
                            xAxis: {
                                type: 'category',
                                data: xData
                              },
                            yAxis: {
                                type: 'value'
                            },
                            dataZoom: [{
                                show: true, 
                            }],
                            series: [{ 
                                data: speedSeries,
                                type: 'line'
                            },{ 
                                data: distanceSeries,
                                type: 'line'
                            }]
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default RunningEChartComponent;