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

const ClaimsPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchClaims() {
            setIsLoading(true);

            authProvider.getAccessToken().then(token => {
                var config = {
                    headers: {'Authorization': "bearer " + token.accessToken}
                };

                axios.get(`${configProvider.API_DOMAIN}/api/Claims`, config).then(result => {
                    setData(result.data);
                    setIsLoading(false);
                }).catch(error => {
                    setIsLoading(false);
                });
            }).catch(error => {
                setIsLoading(false);
            });
        }

        fetchClaims();
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
            <ul>
                {data.map(item => (
                    <li key={item.type}>{item.type}: {item.value}</li>
                ))
                }
            </ul>
        );
    }
};

export default ClaimsPage;