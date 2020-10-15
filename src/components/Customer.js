import React, {Component} from "react";

class Customer extends Component {
    render() {
        const {id, image, name, birth, gender, job} = this.props.info
        return (
            <div>
                <CustomerProfile id={id} image={image} name={name}/>
                <CustomerInfo birth={birth} gender={gender} job={job} />
            </div>
        )
    }
}

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

export default Customer;