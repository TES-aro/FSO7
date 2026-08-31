import axios from 'axios';
const baseUrl = '/api/blogs';

export const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

export const addBlog = async (token, title, author, url) => {
	try{
		console.log('addBlog arguments:');
		console.log(token, author, title, url);
		const config = {
  	  headers: { Authorization: `Bearer ${token}` }
  	};
  	const newBlog = {
		  title:  title,
		  author: author,
		  url: url
  	};
  	const response = await axios.post(baseUrl, newBlog, config);
		return response.data;
	} catch (e) {
		console.log(e);
		return e;
	}
};

const updateBlog = async (blog) => {
	try{
		const res = await axios.put(`${baseUrl}/${blog.id}`, blog);
		return res;
	} catch(e) {
		console.error(e);
		return e;
	}
};

export const like = async (blog) => {
	try{
		const newLikes = blog.likes + 1;
		const newBlog = { ...blog, likes: newLikes };
		const res = updateBlog(newBlog);
		return res;
		//const url = baseUrl + '/' + blog.id;
		//const res = await axios.put(url, newBlog);
		//console.log('response from like()');
		//console.log(res);
		//return res;
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

const getBlog = async (id) => {
	try {
		const response = await axios.get(`${baseUrl}/${id}`);
		return response.data;

	} catch (e) {
		console.log(e);
		return e;
	}
};
export const comment = async (comment, id) => {
	try{
		const blog = await getBlog(id);
		console.log('fetched blog:');
		console.log(blog);
		const newComments = blog.comments ? blog.comments.concat(comment) : [comment];
		const newBlog = { ...blog, comments: newComments };
		const res = await updateBlog(newBlog);
		console.log(res);
		return res;
	} catch (e) {
		console.log(e);
		return e;
	}
};
export default { getAll, addBlog, like, delBlog, comment };
