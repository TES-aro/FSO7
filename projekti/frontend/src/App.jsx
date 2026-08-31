import { useState, useEffect, useRef } from 'react';
import Blogs from './components/Blogs.jsx';
import Blogs2 from './components/Blogs2.jsx';
import Login from './components/Login.jsx';
import NavBar from './components/NavBar.jsx';
import AddBlog from './components/AddBlog.jsx';
import Message from './components/Message.jsx';
import BlogView from './components/BlogView.jsx';
import Users from './components/Users';
import UserView from './components/UserView.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import {
	BrowserRouter as Router,
	Routes, Route, Link, useMatch
} from 'react-router-dom';
import { useBlogActions, useUserActions, initUsers } from './store.jsx';

const App = () => {
	const blogRef = useRef();
	const match = useMatch('/blogs/:id');
	const { init } = useBlogActions();
	const { saved } = useUserActions();
	const userInit = initUsers();

	useEffect(() => {
		const foo = async () => {
			console.log('initing with use effect');
			await init();
			console.log(saved);
			saved();
			userInit();
		};
		foo();
	}, []);

	const padding = { padding: 5 };
	//const blog = match
	//	? blogs.find(blog => blog.id === match.params.id)
	//	: null;

	return (
		<div>
			<ErrorBoundary>
				<NavBar />
				<div>
    			<Message />
    			<Routes>
    				<Route path='/login' element={
    					<Login />
    				} />
    				<Route path='/new' element={
    					<AddBlog />
    				} />
    				<Route path='/' element={
    					<Blogs />
    				} />
    				<Route path='/blogs' element={
	    				<Blogs2 />
    				} />
    				<Route path='/blogs/:id' element={
	    				<BlogView />
    				} />
    				<Route path='/users' element={
    					<Users/>
    				} />
    				<Route path='/users/:id' element={
    					<UserView/>
    				} />
    				<Route path="*" element={
    					<h3> 404 - page not found </h3>
    				} />
    			</Routes>
				</div>
			</ErrorBoundary>
		</div>
	);
};

export default App;
