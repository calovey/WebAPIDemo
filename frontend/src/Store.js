import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import 'react-responsive-modal/styles.css';
import { AddStoreModal } from './AddStoreModal';
import { EditStoreModal } from './EditStoreModal';
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
                                        <Button className="btn btn-success"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                storeid: str.StoreId, storename: str.StoreName
                                            })}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-vector-pen" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z" />
                                                <path fillRule="evenodd" d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z" />
                                            </svg>
                                            Edit
                                        </Button>
                                        <EditStoreModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            storeid={storeid}
                                            storename={storename} />
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
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