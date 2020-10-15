import React, {Component} from "react";
import {TableRow, TableCell} from "@material-ui/core";
class Customer extends Component {
    render() {
        const {id, image, name, birth, gender, job} = this.props.info
        return (
            <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell><img src={image} alt={`poster_${id}`}/></TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{birth}</TableCell>
                <TableCell>{gender}</TableCell>
                <TableCell>{job}</TableCell>
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