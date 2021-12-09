import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export class Store extends Component {

    constructor(props) {
        super(props);
        this.state = { stres: []}
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
        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Store Id</th>
                            <th>Store Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stres.map(str => 
                            <tr key={str.StoreId}>
                                <td>{str.StoreId}</td>
                                <td>{str.StoreName}</td>
                                <td>Edit / Delete</td>
                            </tr>
                            )}
                    </tbody>
                </Table>
            </div>
        )
    }
}