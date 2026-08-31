import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginService from '../services/login.js';
import { TextField, Button } from '@mui/material';
import { setNotification, useUserActions, useUserStore } from '../store.jsx';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useUserActions();
	const user = useUserStore();
	const notify = setNotification();
	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await login(username, password);
			//			const user = await loginService.login({ username, password });
			//			window.localStorage.setItem(
			//				'loggedNoteappUser', JSON.stringify(user)
			//			);

			console.log('done');
			setUsername('');
			setPassword('');
			navigate('/');
		} catch(e) {
			console.log(e);
			notify('wrong credentials');
		}
	};

	useEffect(() => {
		if (user.username !== '') {
			navigate('/');
		}
	},[]);

	if (user.username !== '') {
		return(
			<div>
				<p>
					what are you doing here?
				</p>
			</div>
		);
	}

	return (
	  <div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<TextField
						label="username"
						type="text"
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<TextField
						label="password"
						type="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<Button type="submit" variant="contained" >login</Button>
			</form>
	  </div>
	);
};

export default Login;
