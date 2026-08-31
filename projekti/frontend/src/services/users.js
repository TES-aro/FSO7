const baseURL = 'http://localhost:3003/api/users';

const getAll = async () => {
	console.log('fetching');
	const response = await fetch(baseURL);
	console.log(response);
	return await response.json();
};

export default { getAll };
