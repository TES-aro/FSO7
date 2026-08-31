import Blog from './Blog.jsx';
import { useBlogStore, useBlogActions, setNotification, useUserStore } from '../store.jsx';

const Blogs = () => {
	const { user } = useUserStore();
	const blogs = useBlogStore();
	const { notify } = setNotification();
	if (!blogs) {
		return (
			<p> no blogs? </p>
		);
	}
	return(
		<>
			<h2>blogs</h2>
			<ul>
      		{blogs.map(blog =>
        		<Blog key={blog.id} blog={blog} />
      		)}
      	</ul>
		</>
	);
};

export default Blogs;
