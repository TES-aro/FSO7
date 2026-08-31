import Like from './Like.jsx';
import Delete from './DeleteButton.jsx';
import { Card, CardContent, Typography, Link } from '@mui/material';
import { useBlogStore, useUserStore } from '../store.jsx';
import Comments from './Comments.jsx';

const BlogView = () => {
	//fuck it, with regex
	const url = window.location.href;
	const id = url.match(/[A-Ya-y0-9]+$/);
	console.log(id);
	console.log(url);

	//like voisi toimia nätimmin, mutta revitään se blogs vaan mukana
	const blogs = useBlogStore();
	const user = useUserStore();
	const blog = blogs.find(b => b.id === id[0]);
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
		 	  	<Like blog={blog} />
		 	  	<br />
					<Link href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</Link>
					<br />
					added by {blog.addedBy}
					<Delete blog={blog} />
				</CardContent>
				<Comments blog={blog} />
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
				<Comments blog={blog}/>
			</Card>
		);
	};
	return <h3> No blog found :( </h3>;
};

export default BlogView;
