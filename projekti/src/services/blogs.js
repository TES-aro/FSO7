import axios from 'axios';
const baseUrl = '/api/blogs';

export const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

export const addBlog = async (token, title, author, url) => {
	try{
		const config = {
  	  headers: { Authorization: `Bearer ${token}` }
  	};
  	const newBlog = {
		  title:  title,
		  author: author,
		  url: url
  	};
  	const response = await axios.post(baseUrl, newBlog, config);
  	console.log('response data:');
  	console.log(response.data);
  	return response.data;
	} catch (e) {
		console.log(e);
		return e;
	}
};

export const like = async (blog) => {
	try{
		const newLikes = blog.likes + 1;
		const newBlog = { ...blog, likes: newLikes };
		const url = baseUrl + '/' + blog.id;
		const res = await axios.put(url, newBlog);
		console.log('response from like()');
		console.log(res);
		return res;
	} catch (e) {
		console.log('an error at like function in services/blogs.js');
		console.error(e);
	}
};

export const delBlog = async (token, id) => {
	try{
		const config = {
  	  headers: { Authorization: `Bearer ${token}` }
  	};
  	const url = `${baseUrl}/${id}`;
  	const response = await axios.delete(url, config);
  	console.log('response data:');
  	console.log(response.data);
  	return response.data;
	} catch (e) {
		console.log(e);
		return e;
	}
};
export default { getAll };