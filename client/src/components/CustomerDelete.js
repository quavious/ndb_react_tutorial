import axios from "axios";
import React, {Component} from "react";

export default class CustomerDelete extends Component {
    
    deleteCustomer = (id) => {
        const url = 'api/customers/' + id;
        axios({
            url: url,
            method: "delete",
        }).then(_ => {
            this.props.stateRefresh()
        })
    }
    
    render(){
        const {id} = this.props
        return (
            <button onClick={() => this.deleteCustomer(id)}>삭제</button>
        )
    }
}