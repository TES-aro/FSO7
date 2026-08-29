import { like } from '../services/blogs.js';
import { Button } from '@mui/material';

const Like = ({ blog, blogs, setBlogs, setNotif }) => {
	const likeBlog = (updatedBlog) => {
		setNotif(`liked "${blog.title}" by ${blog.author}`, false);
	  const blogsMap = blogs.map( blog => {
		  console.log(blog);
		  if (blog.id!== updatedBlog.id){
			  return { ...blog };
		  }
		  const newBlog = {
			  ...blog,
			  likes: updatedBlog.likes
		  };
		  return newBlog;
	  });
	  //feels bad to do this twice
	  const sortedArray = blogsMap.toSorted((a, b) => {
		  return b.likes - a.likes;
	  });
	  setBlogs(sortedArray);
	};
	const handleLike = async () => {
		try{
			const res = await like(blog);
			console.log(res.data);
			likeBlog(res.data);
		} catch(e) {
			setNotif(`error liking blog ${blog.title}. ${e.error}`, true);
			console.error(e);
		}
	};
	return (
		<>
			<Button onClick={handleLike}>like</Button>
		</>
	);
};

export default Like;
