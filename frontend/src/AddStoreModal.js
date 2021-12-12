import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import 'react-responsive-modal/styles.css';
export class AddStoreModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'Store', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br'
            },
            //mode: 'no-cors',
            body: JSON.stringify({
                storeName: event.target.StoreName.value
            })
        })
            .then(res => res.json())
            .then((data) => {
                alert(data);
            },
                (error) => {
                    alert(error);
                })
    }
    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add New Store
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="StoreName">
                                        <Form.Label>Store Name</Form.Label>
                                        <Form.Control type="text" name="StoreName" required
                                            placeholder="Store Name" />
                                    </Form.Group>
                                    <br/>
                                    <Form.Group>
                                        <Button variant="success" type="submit">
                                            Add
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}