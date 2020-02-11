import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Button } from 'react-bootstrap';
import moment from 'moment';
import { ResponsiveLine } from '@nivo/line';

const RunningChartComponent = ({data}) => {

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

export default RunningChartComponent;