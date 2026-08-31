import Like from './Like.jsx';
import Delete from './DeleteButton.jsx';
import { Card, CardContent, Typography, Link } from '@mui/material';
import { getUsers } from '../store.jsx';

const UserView = () => {
	//fuck it, with regex
	const url = window.location.href;
	const username = url.match(/[A-Ya-y0-9]*$/);
	const users = getUsers();
	const user = users.find(u => u.username === username[0]);

	if (!user) {
		return <div> no user found </div>;
	}

	if (!user.blogs) {
		return(
			<div> {user.username} {user.name} </div>
		);
	}

	return (
		<div>
			{user.username} {user.name}
			<ul>
				{user.blogs.map(blog => {
					return(<li key={blog.id}>{blog.title} by {blog.author}</li>);
				})}
			</ul>
		</div>
	);
	return <h3> No blog found :( </h3>;
};

export default UserView;
