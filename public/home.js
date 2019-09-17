const e = React.createElement;

const AppNav = () => (
   <nav class="navbar navbar-dark bg-dark">
       <a class="navbar-brand" href="#">Bab Blog</a>
       <a role="button" class="btn btn-outline-info navbar-btn" href="/login">Login</a>
   </nav>
);

const Card = ({ item }) => {
    const { title, content} = item;

        return (
            <div class="card mt-4" Style="width: 100%;">
                <div class="card-body">
                    <h5 class="card-title">{title || "No Title"}</h5>
                    <p class="card-text">{content || "No Content"}</p>
                </div>
            </div>
        )
 }

class Home extends React.Component {
   constructor(props) {
       super(props);
       this.state = { posts: [] };
   }

   componentDidMount() {
    this.getPosts();
}

   getPosts = async () => {
    const response = await fetch('/blogposts');
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
    await this.setState({ posts: publishedPosts })
    console.log(this.state.posts)
}


   render() {
       return (
           
           <div>
               <AppNav />
               {
               this.state.posts.length > 0 ? (
                       this.state.posts.map(item =>
                           <Card item={item}/>
                           )
                   ) : (
                           <div class="card mt-5 col-sm">
                               <div class="card-body">No posts available!</div>
                           </div>
                       )
               }
           </div>
       );
   }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Home), domContainer);