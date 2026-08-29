import { useState, useEffect, useRef } from 'react';
import Blogs from './components/Blogs.jsx';
import Blogs2 from './components/Blogs2.jsx';
import blogService from './services/blogs';
import Login from './components/Login.jsx';
import NavBar from './components/NavBar.jsx';
import AddBlog from './components/AddBlog.jsx';
import Message from './components/Message.jsx';
import Toggle from './components/Toggle.jsx';
import BlogView from './components/BlogView.jsx';
import {
	BrowserRouter as Router,
	Routes, Route, Link, useMatch
} from 'react-router-dom';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const blogRef = useRef();
	const match = useMatch('/blogs/:id');

	const [notif, setNotification] = useState(null);
	const [err, setError] = useState(null);
	const setErr = (text) => {
		setError(text);
		setTimeout(() => {
			setError(null);
		}, 5000);
	};
	const addNotification = (text) => {
		console.log(`new notification: ${text}`);
		const newNotif = text;
		setNotification(newNotif);
		setTimeout(() => {
			setNotification(null);
		}, 5000);
	};

	const setNotif = (text, error) => {
		if (!error) {
			return addNotification(text);
		}
		setErr(text);
	};

	const updateBlogs = (blog) => {
	  console.log('in updateBlogs function');
	  setBlogs([...blogs, blog]);
	};

	//const visRef = useRef();

	useEffect(() => {
		blogService.getAll().then(blogs => {
	    const sortedBlogs = blogs.toSorted((a,b) => {
		    return b.likes - a.likes;
	    });
			setBlogs( sortedBlogs );
		});
	}, []);

	useEffect(() => {
	  setUser(JSON.parse(window.localStorage.getItem('loggedNoteappUser')));
	}, []);

	const padding = { padding: 5 };
	const blog = match
		? blogs.find(blog => blog.id === match.params.id)
		: null;

	return (
		<div>
			<NavBar user={user} setUser={setUser} />
			<div>
    		<Message isError='false' message={notif} />
    		<Message isError='true' message={err} />
    		<Routes>
    			<Route path='/login' element={
    				<Login user={user} setUser={setUser} setError={setErr} />
    			} />
    			<Route path='/new' element={
    				<AddBlog user={user} updateBlogs={updateBlogs} setError={setErr}
    				ref={blogRef}/>
    			} />
    			<Route path='/' element={
    				<Blogs setNotif={setNotif} user={user} blogs={blogs} setBlogs={setBlogs}/>
    			} />
    			<Route path='/blogs' element={
	    			<Blogs2 blogs={blogs}/>
    			} />
    			<Route path='/blogs/:id' element={
	    			<BlogView blog={blog} blogs={blogs} user={user} setNotif={setNotif} setBlogs={setBlogs}/>
    			} />
    		</Routes>
			</div>
		</div>
	);
};

export default App;