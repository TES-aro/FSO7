const User = ({ user, setUser }) => {
	if (!user) {
		return(
			<>
			</>
		);
	}

	const logOut = () => {
		console.log('pressed button');
		setUser(null);
		window.localStorage.removeItem('loggedNoteappUser');
	};
	const name = user.username;
	return (
		<>
			<p> logged in as {name} </p>
			<button onClick={logOut}> log out </button>
		</>
	);
};

export default User;
