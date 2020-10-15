import React, {Component} from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell, Paper} from "@material-ui/core";
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
  }
})

class App extends Component {
  state = {
    customers: []
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

  componentDidMount = () => {
    this.callApi()
  }

  render = () => {
    const {classes} = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <CustomerHeader />
          <TableBody>
          {this.state.customers.map(customer => {
            return <Customer key={customer.id} info={customer} />
          })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
