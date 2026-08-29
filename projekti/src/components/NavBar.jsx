import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const NavBar = ({ user, setUser }) => {
	const navigate = useNavigate();

	const logOut = () => {
		console.log('pressed button');
		setUser(null);
		window.localStorage.removeItem('loggedNoteappUser');
		navigate('/');
	};
	const padding = { padding: 5 };

	if (!user) {
		return (
			<AppBar position='static'>
				<Toolbar>
					<Button color='inherit' component={Link} to='/'>home</Button>
					<Button color='inherit' component={Link} to='/blogs'>blogs</Button>
					<Button color='inherit' component={Link} to='/login'>log in</Button>
				</Toolbar>
			</AppBar>
		);
	}
	const name = user ? user.username : null;
	return(
		<AppBar position='static'>
			<Toolbar>
				<Button color='inherit' component={Link} to='/'>home</Button>
				<Button color='inherit' component={Link} to='/blogs'>blogs</Button>
				<Button color='inherit' component={Link} to='/new'>add a blog</Button>
				<Button color='inherit' onClick={logOut}>log out</Button>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
