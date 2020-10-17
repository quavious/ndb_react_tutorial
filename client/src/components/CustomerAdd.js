import axios from "axios";
import React, {Component} from "react";
import {Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    hidden: {
        display: 'none',
    }
})

class CustomerAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: "",
            birth: "",
            gender: "",
            jog: "",
            fileName: "",
            open: false,
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
        })
        this.props.refresh()
        this.setState({
            file: null,
            userName: "",
            birth: "",
            gender: "",
            jog: "",
            fileName: "",
            open: false,
        })
    }

    handleClickOpen = () => {
        this.setState({open: true})
    }

    handleClickClose = () => {
        this.setState({
            file: null,
            userName: "",
            birth: "",
            gender: "",
            jog: "",
            fileName: "",
            open: false,
        })
    }

    render = () => {
        const {classes} = this.props;
        return (
            /*
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
                생년월일 : <input type="text" name="birth" value={this.state.birth} onChange={this.handleValueChange} />
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                <button type="submit">추가하기</button>
            </form>
            */
           <div>
               <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                   고객 추가하기
               </Button>
               <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName==="" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br />
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
                        <TextField label="생년월일" type="text" name="birth" value={this.state.birth} onChange={this.handleValueChange} />
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
               </Dialog>
           </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);