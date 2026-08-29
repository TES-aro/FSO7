import Like from './Like.jsx';
import Delete from './DeleteButton.jsx';
import { Card, CardContent, Typography, Link } from '@mui/material';

const BlogView = ({ blog, blogs, user, setBlogs, setNotif }) => {
	//like voisi toimia nätimmin, mutta revitään se blogs vaan mukana

	if (blog && user) {
		return(
			<Card sx={{ maxWidth: 345 }} variant='outlined'>
				<CardContent>
					<Typography gutterBottom variant="h5">
        		{blog.title}
        	</Typography>
        	<Typography variant='body'>
        		by {blog.author}
        	</Typography>
        	<br/>
  		  	{blog.likes} likes
		 	  	<Like blog={blog} blogs={blogs} setBlogs={setBlogs} setNotif={setNotif}/>
		 	  	<br />
					<Link href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</Link>
					<br />
					added by {blog.addedBy}
					<Delete blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} setNotif={setNotif}/>
				</CardContent>
			</Card>
		);
	}
	if (blog) {
		return (
			<Card>
  				{blog.title} by {blog.author}
  				<br />
  		  	{blog.likes} likes
		 	  	<br />
				<a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
				<br />
					added by {blog.addedBy}
			</Card>
		);
	};
	return null;
};

export default BlogView;
