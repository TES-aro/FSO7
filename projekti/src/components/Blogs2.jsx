import { Link } from 'react-router-dom';

const Blogs2 = ({ blogs }) => {
	return (
		<div>
			<ul>
				{blogs.map(blog => (
					<li key={blog.id}>
						<Link to={`/blogs/${blog.id}`} data-testid={blog.title}>{blog.title} by {blog.author}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Blogs2;
