import React, {Component} from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress} from "@material-ui/core";
import {AppBar, Toolbar, IconButton, Typography, InputBase} from "@material-ui/core";
import {fade} from "@material-ui/core/styles/colorManipulator";
import {Menu as MenuIcon, Search as SearchIcon} from "@material-ui/icons";
import {withStyles} from "@material-ui/core/styles"
import axios from "axios";

import CustomerAdd from "./components/CustomerAdd";
import Customer from "./components/Customer";
import './App.css';

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1,
    minWidth: 1080,
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center"
  },
  paper: {
    marginLeft: 20,
    marginRight: 20,
  },
  tableHead: {
    fontSize: "1.0rem",
  },
  progress: {
    margin: theme.spacing.unit* 2,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
})

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      customers : [],
      completed : 0,
      searchKeyword: "",
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: [],
      completed: 0,
      searchKeyword: "",
    })
    this.callApi()
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

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render = () => {
    const {classes} = this.props
    const {customers} = this.state;
    const cellList = ["번호","이미지","이름","생년월일","성별","직업","설정"]
    const filteredComponents= (data) => {
      data = data.filter(c => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      })
      return data.map(c => {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} info={c} />
      })
    }
    return (
      <div className={classes.root}>
         <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              고객 관리 시스템
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="회원 검색"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd refresh={this.stateRefresh}/>
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
            {
              cellList.map(cell => <TableCell>{cell}</TableCell>)
            }
            </TableHead>
            <TableBody>
            {customers.length !== 0 ? 
              filteredComponents(this.state.customers)
            : 
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
              </TableCell>
            </TableRow>
            }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);
