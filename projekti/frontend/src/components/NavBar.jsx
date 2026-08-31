import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useUserStore, useUserActions } from '../store';
const NavBar = () => {
	const navigate = useNavigate();
	const user = useUserStore();
	const { reset } = useUserActions();
	const logOut = () => {
		console.log('pressed button');
		reset();
		navigate('/');
	};

	if (user.username === '') {
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
	return(
		<AppBar position='static'>
			<Toolbar>
				<Button color='inherit' component={Link} to='/'>home</Button>
				<Button color='inherit' component={Link} to='/blogs'>blogs</Button>
				<Button color='inherit' component={Link} to='/new'>add a blog</Button>
				<Button color='inherit' onClick={logOut}>log out</Button>
				{user.username}
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
