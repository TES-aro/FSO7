import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { setNotification } from '../store.jsx';
import { useUserStore } from '../store.jsx';
import { useBlogActions } from '../store.jsx';

const AddBlog = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const navigate = useNavigate();
	const user = useUserStore();
	const { create } = useBlogActions();

	//useEffect(() => {
	if (!user.token || user.token === ''){
		console.error('no token!');
		console.log(user);
		navigate('/login');
	}
	//},[])

	const handleSubmit = async (event) => {
		event.preventDefault();
		const token = user.token;
		console.log(token);
		try{
			//const newBlog = await addBlog(token, title, author, url);
			//newBlog.addedBy = user.username;
			//console.log(newBlog);
			await create(user, { title: title, author: author, url: url });
			setTitle('');
			setAuthor('');
			setUrl('');
			navigate('/');
		} catch(e) {
			console.error(e);
			setNotification("couldn't create a blog");
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
