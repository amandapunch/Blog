'use strict';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close'
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {
  withRouter
} from 'react-router-dom'
class About extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalOpen: false,
      };
    }

    handleClickOpen = () => {
        this.setState({modalOpen : true});
      };
      
      handleClose = () => {
        this.setState({modalOpen : false});
      };
      
      handleRedirect = (url) => {
        this.props.history.push('/' + url)
      };

    render() {
        return (
            <div>
    <AppBar position="absolute" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleClickOpen}>
            <MenuIcon>
            </MenuIcon>
          </IconButton>
          <Button color="inherit" onClick={() => this.handleRedirect('')}>Home</Button>
          <Button color="inherit" onClick={() => this.handleRedirect('about')}>About</Button>
          <Button color="inherit" onClick={() => this.handleRedirect('admin')}>Login</Button>
        </Toolbar>
      </AppBar>
      <Dialog fullScreen open={this.state.modalOpen} onClose={this.handleClose}>
        <AppBar position="absolute" >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
              Introspection
            </Typography>
          </Toolbar>
        </AppBar>
      <DialogContent style={{backgroundColor: "#a39eff"}}>
      </DialogContent>
      <DialogActions>
        </DialogActions>
      </Dialog>
            </div >
        );
    }
}
export default About;