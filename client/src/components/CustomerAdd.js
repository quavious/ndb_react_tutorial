import axios from "axios";
import React, {Component} from "react";

export default class CustomerAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: "",
            birth: "",
            gender: "",
            jog: "",
            fileName: "",
        }
        console.log(props)
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value,
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append("image", this.state.file)
        formData.append("name", this.state.userName)
        formData.append("birth", this.state.birth)
        formData.append("gender", this.state.gender)
        formData.append("job", this.state.job)
        const config = {
            headers : {
                'content-type': "multipart/form-data",
            }
        }
        return axios.post(url, formData, config);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer().then(resp => {
            console.log(resp.data)
            this.props.refresh()
        })
        this.setState({
            file: null,
            userName: "",
            birth: "",
            gender: "",
            jog: "",
            fileName: "",
        })
    }

    render = () => {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
                생년월일 : <input type="text" name="birth" value={this.state.birth} onChange={this.handleValueChange} />
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                <button type="submit">추가하기</button>
            </form>
        )
    }
}