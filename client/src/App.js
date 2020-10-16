import React, {Component} from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles"
import axios from "axios";

import CustomerHeader from "./components/CustomerHeader";
import Customer from "./components/Customer";
import './App.css';

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX : "auto",
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: theme.spacing.unit* 2,
  }
})

class App extends Component {
  state = {
    customers: [],
    completed: 0,
  }

  callApi = async() => {
    axios.get("/api/customers")
    .then(resp => resp.data)
    .then(data => {
      this.setState({customers: data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1})
  }

  componentDidMount = () => {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
  }

  render = () => {
    const {classes} = this.props
    const {customers} = this.state;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <CustomerHeader />
          <TableBody>
          {customers.length !== 0 ? customers.map(customer => {
            return <Customer key={customer.id} info={customer} />
          }) : 
          <TableRow>
            <TableCell colSpan="6" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
            </TableCell>
          </TableRow>
          }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
