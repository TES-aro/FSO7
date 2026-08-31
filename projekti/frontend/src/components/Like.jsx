import { Button } from '@mui/material';
import { setNotification, useBlogActions, useUserStore } from '../store.jsx';

const Like = ({ blog }) => {
	const { like } = useBlogActions();
	const notify = setNotification();

	const handleLike = async () => {
		try{
			await like(blog);
			notify('liked a blog');
		} catch(e) {
			notify(`error liking blog ${blog.title}. ${e}`);
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
