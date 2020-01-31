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
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: 200,
    },
  }));

class Admin extends Component {
   constructor(props) {
       super(props);
       this.state = { 
           modalOpen: false,
           posts: [],
           leftPosts: [],
           rightPosts: [],
           isPublished: false,
           editMode: false,
           title: "",
           content: "",
           postId: "",
           editingPostId: "",
           newPost: false,
     };
   }

   componentDidMount() {
       this.getPosts();
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

  handleChangeContent = (e) => {
    this.setState({content: e.target.value});
  };

  handleChangeTitle = (e) => {
    this.setState({title: e.target.value});
  };

  getPosts = async () => {
    const response = await fetch('/blogposts');
    const blogPosts = await response.json();
    this.setState({ posts: blogPosts });
    const rPosts = blogPosts.filter((post, index) => index % 2 )
    const lPosts = blogPosts.filter((post, index) => !(index % 2) )
    this.setState({ leftPosts: lPosts })
    this.setState({ rightPosts: rPosts })

  }

   addNewPost = () => {
    this.setState({isPublished: false})
    this.setState({editMode: true});
    this.setState({newPost: true})
   }

   handleCancel = async () => {
       this.setState({editMode: false});
       await this.getPosts();
   }

   handlePublish = async () => {
       this.setState({ isPublished: true })
}

   handleEdit = (postId) => {
       this.setState({editMode: true})
       this.setState({newPost: false})
       const post = this.state.posts.map((item) => {
           if (item.id === postId) {
               item.editMode = true;
           }
           return item;
       });
       this.setState({ editingPostId: postId });
   }

   handleDelete = async (postId) => {
       await fetch(`/blogposts/${postId}`, {
           method: 'DELETE',
           headers: {
               'content-type': 'application/json',
               accept: 'application/json',
           },
       });
       await this.getPosts();
   }

   handleSubmit = async (e) => {
       e.preventDefault();
       const body = JSON.stringify({
           title: this.state.title,
           content: this.state.content,
           published: this.state.isPublished,
       });
       const headers = {
           'content-type': 'application/json',
           accept: 'application/json',
       };
       const id = this.state.editingPostId;
       if (!this.state.newPost) {
           await fetch(`/blogposts/${id}`, {
               method: 'PUT',
               headers,
               body,
           });
       } else {
           await fetch('/blogposts', {
               method: 'POST',
               headers,
               body,
           });
       }
       this.setState({editMode: false});
       this.setState({editingPostId: ""});
       this.setState({title: ""});
       this.setState({content: ""});
       await this.getPosts();
   }

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
          <Button color="inherit" onClick={() => this.addNewPost()}>Add Post</Button>
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

        <Grid container spacing={3}>
            <Grid item xs={6}>
            </Grid>
        </Grid>
        <Grid
            container
            direction="column"
            justify="space-around"
            >
        
               </Grid>

               <div style={{paddingTop: "30px", backgroundColor: "black"}}>
               {
                   (this.state.editMode) ?
                  (
                    <div style={{paddingTop: "20px", paddingBottom: "20px"}}>
                    <Card variant="outlined" square>
                    <CardContent>
                    <div style={{paddingBottom: "10px"}}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        rows="1"
                        fullWidth
                        onChange={this.handleChangeTitle}
                      /> 
                    </div>
                    <TextField
                        label="Write your blog post here"
                        variant="outlined"
                        multiline
                        rows="10"
                        fullWidth
                        onChange={this.handleChangeContent}
                      />
                      <div style={{paddingTop: "10px"}}>
                      <Button onClick={this.handleSubmit}>Save</Button>
                      <Button onClick={this.handlePublish}>Publish</Button>
                      <Button onClick={this.handleCancel}>Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>
                  </div>
                   ) :(
                       <div>
                                           {
               (this.state.leftPosts.length > 0) && (this.state.rightPosts.length > 0) ? (
                      <div style={{backgroundColor: "black"}}>
                        <Grid container spacing={3}>
                        <Grid item xs={6}>
                       { 
                       this.state.leftPosts.map(post =>
                        <div style={{paddingTop: "20px", paddingBottom: "20px"}}>
                        <Card variant="outlined" square>
                        <CardHeader
                          title={post.title}
                        />
                        <Divider variant="middle"/>
                        <CardMedia
                          title={post.title}
                        />
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {post.content}
                          </Typography>
                          <Button onClick={() => this.handleEdit(post.id)}>Edit</Button>
                          <Button onClick={() => this.handleDelete(post.id)}>Delete</Button> 
                        </CardContent>
                      </Card>
                      </div>
                      )}
                      </Grid>
                    
                      <Grid item xs={6}>
                      { this.state.rightPosts.map(post =>
                      <div style={{paddingTop: "20px", paddingBottom: "20px"}}>
                        <Card variant="outlined" square>
                        <CardHeader
                          title={post.title}
                        />
                        <CardMedia
                          title={post.title}
                        />
                        <Divider variant="middle"/>
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {post.content}
                          </Typography>
                          <Button onClick={() => this.handleEdit(post.id)}>Edit</Button>
                          <Button onClick={() => this.handleDelete(post.id)}>Delete</Button> 
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
                   )
   }
   </div>
   </div>
       );
   }
}

export default Admin;