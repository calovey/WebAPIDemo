import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import 'react-responsive-modal/styles.css';
import { AddStoreModal } from './AddStoreModal';
export class Store extends Component {

    constructor(props) {
        super(props);
        this.state = { stres: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'store')
            .then(response => response.json())
            .then(data => {
                this.setState({ stres: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    render() {
        const { stres, storeid, storename } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Store Id</th>
                            <th>Store Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stres.map(str =>
                            <tr key={str.StoreId}>
                                <td>{str.StoreId}</td>
                                <td>{str.StoreName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button variant="success" >
                                            Update
                                        </Button>
                                        <AddStoreModal show={this.state.addModalShow}
                                            onHide={addModalClose}></AddStoreModal>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button className="btn btn-primary"
                        onClick={() => this.setState({ addModalShow: true })}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                        </svg>
                        New Store
                    </Button>
                    <AddStoreModal show={this.state.addModalShow}
                        onHide={addModalClose}></AddStoreModal>
                </ButtonToolbar>

            </div>
        )
    }
}