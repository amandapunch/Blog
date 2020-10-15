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
import LandingImage from './landing.jpg'
import {Stack} from 'grommet';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';

 class Home extends Component {
   constructor(props) {
       super(props);
       this.state = { 
         posts: [], 
         modalOpen: false,
         leftPosts: [],
         rightPosts: []
        };
   }

   componentDidMount() {
    this.getPosts();
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
          <IconButton edge="start" color="black" aria-label="menu" onClick={this.handleClickOpen}>
            <MenuIcon>
            </MenuIcon>
          </IconButton>
          <Button color="black" onClick={() => this.handleRedirect('')}>Home</Button>
          <Button color="black" onClick={() => this.handleRedirect('about')}>About</Button>
          <Button color="black" onClick={() => this.handleRedirect('admin')}>Login</Button>
        </Toolbar>
      </AppBar>

      <Dialog fullScreen open={this.state.modalOpen} onClose={this.handleClose}>
        <AppBar position="absolute" >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
              Running Mindset
            </Typography>
          </Toolbar>
        </AppBar>
      <DialogContent style={{backgroundColor: "#fffff"}}>
      </DialogContent>
      </Dialog>
      
      <Stack anchor='center'>
      <Image fit='cover' fill='true' src={LandingImage} />
        <p style={{color: "white", paddingBottom: "400px"}}>
          <span style={{fontSize: "80px"}}>Running Mindset<br/></span>
          <span style={{fontSize: "25px"}}>A blog about how to start running to stay healthy and be happier.</span>
          </p>
    </Stack>  
               {
               (this.state.leftPosts.length > 0) || (this.state.rightPosts.length > 0) ? (
                      <div style={{backgroundColor: "black"}}>
                        <Grid container spacing={3}>
                        <Grid item xs={6}>
                       { 
                       this.state.leftPosts.map(post =>
                        <div style={{paddingTop: "20px", paddingBottom: "20px"}}>
                        <Card variant="outlined" square onClick={() => this.handleRedirect('post/' + post.title + '/' + post.id)}>
                        <CardHeader
                          title={post.title}
                        />
                        <Divider variant="middle"/>
                        <CardContent>
                        </CardContent>
                      </Card>
                      </div>
                      )}
                      </Grid>
                    
                      <Grid item xs={6}>
                      { this.state.rightPosts.map(post =>
                      <div style={{paddingTop: "20px", paddingBottom: "20px"}}>
                        <Card variant="outlined" square onClick={() => this.handleRedirect('post/' + post.title + '/' + post.id)}>
                        <CardHeader
                          title={post.title}
                        />
                        <Divider variant="middle"/>
                        <CardContent>
                        </CardContent>
                      </Card>
                      </div>
                        )}
                      </Grid>
                      </Grid>
                      </div>
                           
                   ) : (
                           <div className="card mt-5 col-sm">
                               <div className="card-body">No posts available!</div>
                           </div>
                       )
               }
           </div>
           
       );
   }
}

export default Home;