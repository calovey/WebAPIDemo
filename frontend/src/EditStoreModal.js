import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import 'react-responsive-modal/styles.css';
export class EditStoreModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'Store', {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br'
            },
            //mode: 'no-cors',
            body: JSON.stringify({
                StoreId: event.target.StoreId.value,
                StoreName: event.target.StoreName.value
            })
        })
            .then(res => res.json())
            .then((data) => {
                alert(data);
            },
                (error) => {
                    alert('Failed');
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
                            Edit Store
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="StoreId">
                                        <Form.Label>Store Id</Form.Label>
                                        <Form.Control type="text" name="StoreId" required
                                            disabled
                                            defaultValue={this.props.storeid}
                                            placeholder="Store ID" />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="StoreName">
                                        <Form.Label>Store Name</Form.Label>
                                        <Form.Control type="text" name="StoreName" required
                                            defaultValue={this.props.storename}
                                            placeholder="Store Name" />
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Store
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