import axios from "axios";
import React, {Component} from "react";
import {Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button, Typography} from "@material-ui/core";

export default class CustomerDelete extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
        }
    }

    handleClickOpen = () => {
        this.setState({open: true})
    }

    handleClickClose = () => {
        this.setState({
            open: false,
        })
    }

    deleteCustomer = (id) => {
        const url = 'api/customers/' + id;
        axios({
            url: url,
            method: "delete",
        }).then(_ => {
            this.props.stateRefresh()
        })
        this.setState({open:false,})
    }
    
    render(){
        const {id} = this.props
        return (
            <>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                    삭제
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={() => this.deleteCustomer(id)}>
                            삭제
                        </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}