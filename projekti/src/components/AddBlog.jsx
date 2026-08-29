import { useState } from 'react';
import { addBlog } from '../services/blogs.js';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const AddBlog = ({ user, updateBlogs, setError }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const navigate = useNavigate();

	//useEffect(() => {
	if (!user){
		console.log('_---fuck you---_');
		console.log(user);
		navigate('/login');
	}
	//},[])

	const handleSubmit = async (event) => {
		event.preventDefault();
		const token = user.token;
		try{
			const newBlog = await addBlog(token, title, author, url);
			console.log('new blog');
			newBlog.addedBy = user.username;
			console.log(newBlog);
			updateBlogs(newBlog);
			setTitle('');
			setAuthor('');
			setUrl('');
			navigate('/');
		} catch(e) {
			console.log(e);
			setError(e);
		}

	};

	return (
		<>
			<h2> add a blog </h2>
			<form onSubmit={handleSubmit}>
				<div>
					<TextField
						label='title'
						type='text'
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					<TextField
						label='author'
						type='text'
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					<TextField
						label='url'
						type='text'
						value={url}
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<Button type='submit' variant='contained' style={{ marginTop: 10 }}>add</Button>
			</form>
		</>
	);
};

export default AddBlog;
