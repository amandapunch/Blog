import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Accordion, AccordionPanel, Box } from 'grommet';
import { Carousel, Image } from 'grommet';

const AppNav = () => (
   <nav className="navbar navbar-dark bg-dark">
       <a className="navbar-brand" href="#">Bab Blog</a>
       {/* <a role="button" class="btn btn-outline-info navbar-btn" href="/login">Login</a> */}
       <Button  variant="contained">Login</Button>
   </nav>
);

const Card = ({ item }) => {
    const { title, content} = item;

        return (
            <div className="card mt-4" Style="width: 100%;">
                <div className="card-body">
                    <h5 className="card-title">{title || "No Title"}</h5>
                    <p className="card-text">{content || "No Content"}</p>
                </div>
            </div>
        )
 }

 class Home extends Component {
   constructor(props) {
       super(props);
       this.state = { posts: [] };
   }

   componentDidMount() {
    this.getPosts();
}

   getPosts = async () => {
    console.log("Hello")
    const response = fetch('/blogposts');
    console.log(response)
    const data = await response.json();
    const publishedPosts = [];
    console.log(data);
    data.forEach(item => 
        {
            console.log(item.published)
            if(item.published == true){
            publishedPosts.push(item)
        }
    }
        );
        console.log(publishedPosts)
    this.setState({ posts: publishedPosts })
    console.log(this.state.posts)
}


   render() {
       return (
           <div>
               
               <Grid>
              <Grid item xs={12}>
            <Paper>
            Bab's Blog!
            </Paper>
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained">Login!</Button>  
            </Grid>
            </Grid>
            <div>
            <Box fill='horizontal'>
      <Accordion animate={true} multiple={true} margin='small'>
        <AccordionPanel label='Panel 1'>
          <Box background='light-1'>Panel 1 content</Box>
        </AccordionPanel>
        <AccordionPanel label='Panel 2'>
          <Box height='small' background='light-1'>Panel 2 content</Box>
        </AccordionPanel>
        <AccordionPanel label='Panel 3'>
          <Box height='medium' background='light-1'>Panel 3 content</Box>
        </AccordionPanel>
      </Accordion>
    </Box>
    <Box height="small" width="medium" overflow="hidden">
  <Carousel fill>
  <Image fit="cover" src="Breakwater.jpg" />
    <Image fit="cover" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg" />
    <Image fit="cover" src="//v2.grommet.io/assets/IMG_4245.jpg" />
    <Image fit="cover" src="//v2.grommet.io/assets/IMG_4210.jpg" />
  </Carousel>
</Box>
            </div>
               {
               this.state.posts.length > 0 ? (
                       this.state.posts.map(item =>
                           <Card item={item}/>
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