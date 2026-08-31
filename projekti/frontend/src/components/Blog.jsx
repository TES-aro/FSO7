import Like from './Like.jsx';
import Delete from './DeleteButton.jsx';
import { useState } from 'react';
import { useUserStore } from '../store.jsx';

const Blog = ( { blog }) => {
	const user = useUserStore();
	const blogStyle = {
		paddingTop: 5,
		paddingBottom: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	};

	const blogPStyle = {
		paddingTop: 0,
		marginBottom: 0
	};

	const [visible, setVisible] = useState(false);
	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };
	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const testID = `${blog.title} by ${blog.author}`;
	if (!user) {
		return (
  		<li style={blogStyle} className='blog'>
  		  <div style={hideWhenVisible}>
  				<p style={blogPStyle} data-testid={testID}>
  		  		{blog.title} by {blog.author}
  		  		<br />
  		  		<button onClick={toggleVisibility}> show more </button>
  		  	</p>
  		  </div>
  		  <div style={showWhenVisible}>
  				<p style={blogPStyle}>
  			  	{blog.title} by {blog.author}
  			  	<br />
  		  		{blog.likes} likes
	 		  		<br />
						<a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
						<br />
						added by {blog.addedBy}
						<br />
						<button onClick={toggleVisibility}> show less </button>
					</p>
				</div>
  		</li>
		);
	}

	return (
  	<li style={blogStyle} className='blog'>
  	  <div style={hideWhenVisible}>
  			<p style={blogPStyle} data-testid={testID}>
  	  		{blog.title} by {blog.author}
  	  		<br />
  	  		<button onClick={toggleVisibility}> show more </button>
  	  	</p>
  	  </div>
  	  <div style={showWhenVisible}>
  			<p style={blogPStyle}>
  		  	{blog.title} by {blog.author}
  		  	<br />
  	  		{blog.likes} likes
	 	  		<Like blog={blog} />
	 	  		<br />
					<a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
					<br />
					added by {blog.addedBy}
					<Delete blog={blog} />
					<br />
					<button onClick={toggleVisibility}> show less </button>
				</p>
			</div>
  	</li>
	);
};

export default Blog;
//<a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
