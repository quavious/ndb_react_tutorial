import React, {Component} from "react";
import {TableRow, TableCell} from "@material-ui/core";

import CustomerDelete from "./CustomerDelete";
class Customer extends Component {
    render() {
        const {id, image, name, birth, gender, job} = this.props.info
        const {stateRefresh} = this.props
        return (
            <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell><img src={image} alt={`poster_${id}`} class="profile"/></TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{birth}</TableCell>
                <TableCell>{gender}</TableCell>
                <TableCell>{job}</TableCell>
                <TableCell><CustomerDelete stateRefresh={stateRefresh} id={id}/></TableCell>
            </TableRow>
        )
    }
}

/*
class CustomerProfile extends Component {
    render(){
        const {id, image, name} = this.props
        return (
            <div>
                <img src={image} alt={`profile_${id}`} />
                <h2>{name}{id}</h2>
            </div>
        )
    }
}

class CustomerInfo extends Component {
    render(){
        const {birth, gender, job} = this.props
        return (
            <div>
                <p>{birth}</p>
                <p>{gender}</p>
                <p>{job}</p>
            </div>
        )
    }
}
*/

export default Customer;