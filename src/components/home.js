import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Carousel, Image } from 'grommet';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import LandingImage from './stars.jpg'
import { Box, Stack, Paragraph, Text } from 'grommet';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {
  withRouter
} from 'react-router-dom'

 class Home extends Component {
   constructor(props) {
       super(props);
       this.state = { 
         posts: [], 
         modalOpen: false,
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
          <Button color="inherit" onClick={() => this.handleRedirect('posts')}>Read</Button>
          <Button color="inherit" onClick={() => this.handleRedirect('about')}>About</Button>
          <SearchIcon/>
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
      
      <Stack anchor='center'>
      <Image fit='cover' fill='true' src={LandingImage} />
        <p style={{color: "white", paddingBottom: "400px"}}>
          <span style={{fontSize: "100px"}}>Introspection<br/></span>
          <span style={{fontSize: "20px"}}>noun<br/></span>
          <span style={{fontSize: "25px"}}>The examination or observation of one's own mental and emotional processes.</span>
          </p>
    </Stack>           
               {
               this.state.posts.length > 0 ? (
                       this.state.posts.map(post =>
                      <div style={{backgroundColor: "#dbe1ff"}}>
                        <Grid container spacing={3}>
                        <Grid item xs={6}>
                        <Card>
                        <CardHeader
                          title={post.title}
                        />
                        <CardMedia
                          image="/static/images/cards/paella.jpg"
                          title={post.title}
                        />
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {post.content}
                          </Typography>
                        </CardContent>
                      </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card>
                        <CardHeader
                          title={post.title}
                        />
                        <CardMedia
                          image={LandingImage}
                          title={post.title}
                        />
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {post.content}
                          </Typography>
                        </CardContent>
                      </Card>
                      </Grid>
                      </Grid>
                      </div>
                           )
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