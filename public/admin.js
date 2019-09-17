'use strict';
const e = React.createElement;

const AppNav = () => (
   <nav class="navbar navbar-dark bg-dark">
       <a class="navbar-brand" href="#">My Blog!!</a>
       <a role="button" class="btn btn-outline-info navbar-btn" href="/logout">Logout</a>
   </nav>
);

const Card = ({ item, handleSubmit, handleEdit, handleDelete, handleCancel, handlePublish }) => {
   const { title, content, published, editMode } = item;

   if (editMode) {
       return (
           <div class="card mt-4" Style="width: 100%;">
               <div class="card-body">
                   <form onSubmit={handleSubmit}>
                       <input type="hidden" name="id" value={item.id} />
                       <div class="input-group input-group-sm mb-3">
                           <input type="text" name="title" class="form-control" placeholder="Title" defaultValue={title} />
                       </div>
                       <div class="input-group input-group-sm mb-3">
                           <textarea name="content" class="form-control" placeholder="Content" defaultValue={content}></textarea>
                       </div>
                       <button type="button" class="btn btn-outline-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                       <button type="submit" class="btn btn-info btn-sm ml-2">Save</button>
                       <button type="submit" class="btn btn-info btn-sm ml-2" onClick={handlePublish}>Publish</button>
                   </form>
               </div>
           </div>
       )
   } else {
       return (
           <div class="card mt-4" Style="width: 100%;">
               <div class="card-body">
                   <h5 class="card-title">{title || "No Title"}</h5>
                   <p class="card-text">{content || "No Content"}</p>
                   <button type="button" class="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
                   <button type="submit" class="btn btn-info btn-sm ml-2" onClick={handleEdit}>Edit</button>
               </div>
           </div>
       )
   }
}

class Admin extends React.Component {
   constructor(props) {
       super(props);
       this.state = { 
           data: [],
           isPublished: false,
     };
   }

   componentDidMount() {
       this.getPosts();
   }

   getPosts = async () => {
       const response = await fetch('/blogposts');
       const data = await response.json();
       data.forEach(item => item.editMode = false);
       this.setState({ data })
   }

   addNewPost = () => {
       const data = this.state.data;
       this.setState({isPublished: false})
       console.log("Adding new post")
       data.unshift({
           editMode: true,
           title: "",
           content: "",
           published: false,
       })
       this.setState({ data })
   }

   handleCancel = async () => {
       await this.getPosts();
   }

   handlePublish = async () => {
       await this.setState({ isPublished: true })
}

   handleEdit = (postId) => {
       const data = this.state.data.map((item) => {
           if (item.id === postId) {
               item.editMode = true;
           }
           return item;
       });
       this.setState({ data });
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

   handleSubmit = async (event) => {
       event.preventDefault();
       const data = new FormData(event.target);
        console.log("Hello")
        console.log(this.state.data)
        console.log(data.get('published'))
       const body = JSON.stringify({
           title: data.get('title'),
           content: data.get('content'),
           published: this.state.isPublished,
       });
       const headers = {
           'content-type': 'application/json',
           accept: 'application/json',
       };

       if (data.get('id')) {
           await fetch(`/blogposts/${data.get('id')}`, {
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
       await this.getPosts();
   }

   render() {
       return (
           <div>
               <AppNav />
               <button type="button" class="mt-4 mb-2 btn btn-primary btn-sm float-right" onClick={this.addNewPost}>
                   Add New Post
               </button>
               {
                   this.state.data.length > 0 ? (
                       this.state.data.map(item =>
                           <Card item={item}
                               handleSubmit={this.handleSubmit}
                               handleEdit={this.handleEdit.bind(this, item.id)}
                               handleDelete={this.handleDelete.bind(this, item.id)}
                               handleCancel={this.handleCancel}
                               handlePublish={this.handlePublish}
                           />)
                   ) : (
                           <div class="card mt-5 col-sm">
                               <div class="card-body">You don't have any posts. Use the "Add New Post" button to add some new posts!</div>
                           </div>
                       )
               }
           </div >
       );
   }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Admin), domContainer);