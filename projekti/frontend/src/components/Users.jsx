import { getUsers } from '../store';
import { Link } from 'react-router-dom';

const Users = () => {
	const users = getUsers();
	return(
		<div>
			<h2> Users </h2>
			<ul>
				{users.map(user => {
					const createdCount = user.blogs ? user.blogs.length : 0;
					return(
						<li key={user.id}>
							<Link to={`/users/${user.username}`}>{user.name}</Link> {user.username} {createdCount}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Users;
