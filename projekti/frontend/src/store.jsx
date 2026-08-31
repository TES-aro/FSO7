import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import blogService from './services/blogs';
import loginService from './services/login';
import persistentUser from './services/persistentUser';
import userService from './services/users';

const notificationStore = create(devtools(set => ({
	notif: '',
	notify: txt => {
		console.log('in notify');
		console.log(txt);
		set(state => ({ notif: String(txt) }));
		setTimeout(() => {
			set(state => ({ notif: '' }));
		}, 5000);
	}
})));

export const usersStore = create(set => ({
	users: [],
	init: async () => {
		try{
			const response = await userService.getAll();
			console.log(response);
			set(state => ({
				users: response
			}));

		} catch (e) {
			console.error(e);
		}
	}
}));

const blogsStore = create(set => ({
	blogs: [],
	actions: {
		init: async () => {
			try{
				const response = await blogService.getAll();
				set(state => ({
					blogs: response
				}));
			} catch (e) {
				console.error(e);
			}
		},
		create: async (user, blog) => {
			try{
				console.log(user);
				const response = await blogService.addBlog(user.token, blog.title, blog.author, blog.url);
				response.addedBy = user.username;
				set(state => ({
					blogs: state.blogs.concat(response)
				}));
			}catch(e) {
				throw new Error(e);
			}
		},
		del: async (token, id) => {
			try{
				await blogService.delBlog(token, id);
				set(state => ({
					blogs: state.blogs.filter( b => b.id !== id)
				}));
			} catch (e) {
				console.error(e);
			}
		},
		like: async (blog) => {
			try{
				console.log(blog);
				const res = await blogService.like(blog);
				set(state => ({
					blogs: state.blogs.map( b => b.id === res.data.id ? res.data : b)
				}));
			} catch (e) {
				console.error(e);
			}
		},
		comment: async (comment, id) => {
			try {
				const res = await blogService.comment(comment, id);
				if(res.error){
					throw new Error(res.error);
				}
				console.log('response:');
				console.log(res);
				set(state => ({
					blogs: state.blogs.map( b => b.id === res.data.id ? res.data : b)
				}));
			} catch(e) {
				console.error(e);
				throw new Error("couldn't add a comment");
			}
		}
	}
}));

const userStore = create(devtools(set => ({
	user: {
		username: '',
		name: '',
		id: '',
		token: ''
	},
	actions: {
		saved: () => {
			console.log('in saved');
			const savedUser = persistentUser.getUser();
			if (savedUser) {
				console.log(savedUser);
				set(state => ({
					user: savedUser
				}));
			}
		},
		login: async (username, password) => {
			try {
				const response = await loginService.login({ username, password });
				console.log(response);
				const userObject = {
					username: username,
					name: response.name,
					id: response.id,
					token: response.token
				};
				set(state => ({
					user: userObject
				}));
				persistentUser.saveUser(userObject);
			} catch(e){
				console.log('userStore login error');
				console.log(e);
				throw new Error(e);
			}
		},
		reset: () => {
			set(state => ({
				user: {
					username: '',
					name: '',
					id: ''
				}
			}));
		}
	}
})));

export const getUsers = () => usersStore(state => state.users);
export const initUsers = () => usersStore(state => state.init);

export const useNotification = () => notificationStore(state => state.notif);
export const setNotification = () => notificationStore(state => state.notify);
export const useBlogStore = () => blogsStore(state => state.blogs);
export const useBlogActions = () => blogsStore(state => state.actions);

export const useUserStore = () => userStore(state => state.user);
export const useUserActions = () => userStore(state => state.actions);
