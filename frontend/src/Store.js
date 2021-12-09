import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddStoreModal } from './AddStoreModal';
export class Store extends Component {

    constructor(props) {
        super(props);
        this.state = { stres: [], addModalShow: false, }
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
        const { stres } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
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
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary"
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Store
                    </Button>
                    <AddStoreModal show={this.state.addModalShow} 
                    onhide={addModalClose}></AddStoreModal>
                </ButtonToolbar>

            </div>
        )
    }
}