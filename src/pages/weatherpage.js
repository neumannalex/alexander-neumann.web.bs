import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from '../authProvider';
import Container from 'react-bootstrap/Container';
import { css } from "@emotion/core";
import { ClipLoader, PulseLoader } from "react-spinners";
import { Col, Row } from 'react-bootstrap';
import { configProvider } from '../configProvider';

const WeatherPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchWeather() {
            setIsLoading(true);

            axios.get(`${configProvider.API_DOMAIN}/api/WeatherForecast`).then(result => {
                setData(result.data);
                setIsLoading(false);
            }).catch(error => {
                setIsLoading(false);
            });
        }

        fetchWeather();
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
            <table>
                <tbody>
                    {data.map((item,index) => (
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.temperatureC} °C</td>
                            <td>{item.temperatureF} °F</td>
                            <td>{item.summary}</td>
                        </tr>
                    ))
                    }    
                </tbody>
            </table>
            
        );
    }
};

export default WeatherPage;