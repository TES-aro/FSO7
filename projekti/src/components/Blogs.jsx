import Blog from './Blog.jsx';

const Blogs = ({ user, blogs, setBlogs, setNotif }) => {

	return(
		<>
			<h2>blogs</h2>
			<ul>
      		{blogs.map(blog =>
        		<Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setNotif={setNotif} user={user} />
      		)}
      	</ul>
		</>
	);
};

export default Blogs;
