const KEY = 'loggedInUser';

const getUser = async () => {
	const user = window.localStorage.getItem(KEY);
	return await JSON.parse(user);
};

const saveUser = (user) => {
	window.localStorage.setItem(KEY, JSON.stringify(user));
};

const removeUser = () => {
	window.localStorage.removeItem(KEY);
};

export default { getUser, saveUser, removeUser };
