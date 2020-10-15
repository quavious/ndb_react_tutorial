import React, {Component} from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell, Paper} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles"

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
const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "홍길동",
    birth: "961222",
    gender: "남자",
    job: "대학생"
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "김공익",
    birth: "961222",
    gender: "남자",
    job: "대학생"
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "이공군",
    birth: "991220",
    gender: "남자",
    job: "부사관"
  },
]

class App extends Component {
  render(){
    const {classes} = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <CustomerHeader />
          <TableBody>
          {customers.map(customer => {
            return <Customer key={customer.id} info={customer} />
          })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
