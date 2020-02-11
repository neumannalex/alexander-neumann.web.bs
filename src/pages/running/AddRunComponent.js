import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authProvider } from '../../authProvider';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'
import Moment from 'react-moment';
import { Col, Row, Button } from 'react-bootstrap';
import { configProvider } from '../../configProvider';
import moment from 'moment';
import 'moment/locale/de.js'
import { useFormik } from 'formik';
import LoadingOverlay from 'react-loading-overlay';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import InputMask from "react-input-mask";

const AddRunComponent = (props) => {
    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const formik = useFormik({
        initialValues: {
             trainingDate: moment().format('YYYY-MM-DD'),
             duration: '',
             distance: '',
             energy: ''
        },
        onSubmit: values => {
            const postData = {
                trainingDate: moment.utc(values.trainingDate).toISOString(),
                durationInSeconds: moment.duration(values.duration).asSeconds(),
                distanceInMeters: Math.round(values.distance),
                energyInKCal: Math.round(values.energy)
            }

            console.log('postData', postData)

            authProvider.getAccessToken().then(token => {
                var config = {
                    headers: {'Authorization': "bearer " + token.accessToken}
                };

                axios.post(`${configProvider.API_DOMAIN}/api/trainingruns`, postData, config).then(result => {
                    setMessage(<Alert variant="success" onClose={() => setShowMessage(false)} dismissible>Training gespeichert</Alert>);
                    setShowMessage(true);

                    if(props.reloadCallback) {
                        props.reloadCallback();
                    }

                }).catch(error => {
                    var reason = "Bad request";
                    if(error.response) {
                        if(error.response.data.title) {
                            reason = error.response.data.title;
                        }
                    }
                    setMessage(<Alert variant="danger" onClose={() => setShowMessage(false)} dismissible>{reason}</Alert>);
                    setShowMessage(true);
                }).finally(() => {
                    formik.setSubmitting(false);
                });
            }).catch(error => {
                setMessage(<Alert variant="danger" onClose={() => setShowMessage(false)} dismissible>Authentication failed</Alert>);
                setShowMessage(true);
            }).finally(() => {
                formik.setSubmitting(false);
            });

            
        }
    });

    const handleTrainingdateChange = (jsDate, dateString) => {
        formik.setFieldValue('trainingDate', dateString);
    };

    const handleDurationChange = (event) => {
        formik.setFieldValue('duration', event.target.value);
    };

    return (
        <Container>
            {
                showMessage && message
            }
            <LoadingOverlay
            active={formik.isSubmitting}
            spinner
            text='Speichere Trainingsdaten...'>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Trainingsdatum</Form.Label>
                        <Col sm="10">
                            <DatePickerInput
                                id="trainingDate"
                                name="trainingDate"
                                type="text"
                                onChange={handleTrainingdateChange}
                                value={formik.values.trainingDate}
                                displayFormat="DD.MM.YYYY"
                                returnFormat="YYYY-MM-DD"
                                showOnInputClick
                                locale="de"
                                />
                            <Form.Text className="text-muted">Tag des Trainings</Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Trainingsdauer</Form.Label>
                        <Col sm="10">
                            {/* <Form.Control type="text"
                            id="duration"
                            name="duration"
                            value={formik.values.duration}
                            onChange={formik.handleChange}
                            placeholder="35:00" /> */}
                            <InputMask
                                id="duration"
                                name="duration"
                                className="form-control"
                                onChange={handleDurationChange}
                                value={formik.values.duration}
                                mask="99:99:99"
                                maskPlaceholder="hh:mm:ss" />
                            <Form.Text className="text-muted">Dauer des Trainings in Stunden, Minuten und Sekunden [h:mm:ss]</Form.Text>
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
            </LoadingOverlay>
        </Container>
    );
}

export default AddRunComponent;
