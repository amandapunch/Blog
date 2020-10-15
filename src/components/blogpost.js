import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Image} from 'grommet';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {Stack} from 'grommet';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import {
  withRouter
} from 'react-router-dom'
 class BlogPost extends Component {
   constructor(props) {
       super(props);
       this.state = { 
         post: {}, 
         modalOpen: false,
         leftPosts: [],
         rightPosts: []
        };
   }

   componentDidMount() {
    this.getPost();
    console.log(this.props.match.params.id);
    console.log(this.state.post)
    console.log( typeof this.props.match.params)
    console.log(this.state.leftPosts)
}

getPost = async () => {
  const response = await fetch('/blogposts');
  const posts = await response.json();
  posts.forEach(item => 
    {
        if(item.id == this.props.match.params.id){
        console.log("found post")
        console.log(item);
        console.log(typeof item)
        this.setState({post : item});
    }
});
}

getPosts = async () => {
  const response = await fetch('/blogposts');
  const posts = await response.json();
  const publishedPosts = [];
  posts.forEach(item => 
    {
        if(item.published == true){
        publishedPosts.push(item)
    }
});
  this.setState({ posts: publishedPosts })
  const rPosts = publishedPosts.filter((post, index) => index % 2 )
  const lPosts = publishedPosts.filter((post, index) => !(index % 2) )
  this.setState({ leftPosts: lPosts })
  this.setState({ rightPosts: rPosts })
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
          <Button color="inherit" onClick={() => this.handleRedirect('posts')}>Read</Button>
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
          <Button color="primary">
            Read
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{paddingTop: "50px"}}>
      <Card>
      <CardHeader
                          title={this.state.post.title}
                        />
                        <Divider variant="middle"/>
                        <CardMedia
                          title={this.state.post.title}
                        />
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {this.state.post.content}
                          </Typography>
                        </CardContent>
                        </Card>
           </div>

           </div>
           
       );
   }
}

export default withRouter(BlogPost);