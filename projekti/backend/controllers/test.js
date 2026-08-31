const testRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

testRouter.get('/reset', async (request, response) => {
	console.log('-----\n   reseting\n-----')
	await Blog.deleteMany({});
	await User.deleteMany({});
	try{
		//joo, hardcoding bad
  	const username = 'root'
  	const name = 'root'
  	const password = 'salasana'
  	const saltRounds = 10
  	const passwordHash = await bcrypt.hash(password, saltRounds)

  	const user = new User({
  	  username,
  	  name,
  	  passwordHash,
  	})

  	const savedUser = await user.save()
  	console.log(`saved user:`)
  	console.log(savedUser)

  	const blog = new Blog({
	  	title: "lorem ipsum",
	  	author: "me",
	  	url: "http://spam.com",
	  	likes: 0,
	  	userID: savedUser._id
  	})

  	await blog.save();

  	const blog2 = new Blog({
	  	title: 'on testing',
	  	author: 'somebofy',
	  	url: "http://localhost.test/blog",
	  	likes: 3,
	  	userID: savedUser._id
  	})

  	const savedBlog = await blog2.save();
  	console.log(savedBlog)

  	response.status(201).json(savedUser)
	} catch(e){
		console.error(e)
		response.status(400).json(e)
	}
})

module.exports = testRouter;
