const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const Users = require('../models/user.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');



blogsRouter.get('/', async (request, response) => {
	console.log('getting all')
  const blogs = await Blog.find({})
  // helvetin epätehokas, mutta olen tyhmä.
  // SQL pelasta minut ;_;
  const cleanBlogs = await Promise.all(blogs.map( async blog => {
	  const addedBy = await Users.findById(blog.userID);
	  const newBlog = {
		  title: blog.title,
		  author: blog.author,
		  likes: blog.likes,
		  url: blog.url,
		  addedBy: addedBy.username,
		  userID: blog.userID,
		  id: blog._id,
		  comments: blog.comments
	  }
	  return newBlog
  }))

  response.json(cleanBlogs)
})

blogsRouter.get('/:id', async (req, res) => {
	console.log('getting /api/blogs/:id')
	try{
		const id = req.params.id;
		console.log(id)
		const blog = await Blog.findById(id);
		console.log(blog)
		const addedBy = await Users.findById(blog.userID);
		console.log(addedBy)
		const newBlog = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			comments: blog.comments,
			addedBy:addedBy.username,
			id: blog._id}
		console.log(newBlog)
		res.json(newBlog)
	}catch (e){
		consol.log('something went wrong with getting blog by id')
		console.error(e);
		response.status(404),json({error: "couldn't locate blog"})
		
	}
})

blogsRouter.post('/', async (request, response) => {
	try {
		const body = request.body;
		if(!body.url || !body.title){
			throw new Error('missing a required field');
		}
		const decodedToken = jwt.verify(request.token, process.env.SECRET);
		if (!decodedToken.id) {
			return response.status(401).json({error: 'invalid token'});
		}
		const user = await Users.findById(decodedToken.id);
		if (!user) {
			throw new Error('missing userID')
		}
  	const blog = new Blog({
		 	title: body.title,
		 	author: body.author,
		 	url: body.url,
		 	likes: body.likes || 0,
			userID: user.id
  	})
  	const result = await blog.save()
  	response.status(201).json(result)
	} catch (e) {
		console.log("\n\n\n___ error ___")
		console.log(e)
		console.log("___")
		if (e.name === 'JsonWebTokenError'){
			response.status(401).json({error: 'tokken missing or invalid'})
			return
		}
		response.status(400).send(e)
	}
})

blogsRouter.delete('/:id', async (req, res) => {
	try{
		const id = req.params.id;
		if (!req.token){
			return res.status(401).json({error: 'invalid token'})
		}
		const decodedToken = jwt.verify(req.token, process.env.SECRET)
		if (!decodedToken.id) {
			return res.status(401).json({error: 'invalid token'})
		}
		const response = await Blog.findById(id);
		if (response.userID.toString() !== decodedToken.id){
			return res.status(401).json({error: 'invalid token'})
		}
		const delResponse = await Blog.findByIdAndDelete(id);
		res.status(200).send(delResponse.body)
	} catch (e) {
		console.log("\n\n___ error ___")
		console.log(e)
		res.status(400).send(e)
	}
})

blogsRouter.put('/:id', async (req, res) => {
	try{
		const id = req.params.id;
		const updatedBlog = req.body;
		// mutaatio, mutta eh
		delete updatedBlog.id;
		const response = await Blog.findByIdAndUpdate(id, updatedBlog, {
			runValidators: 'true', returnDocument: 'after'})
		res.status(200).send(response)
	} catch (e) {
		res.status(400).send(e)
	}
})

module.exports = blogsRouter;
