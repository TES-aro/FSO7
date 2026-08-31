import { delBlog } from '../services/blogs.js';
import { Button } from '@mui/material';
import { useUserStore, useBlogActions, setNotification } from '../store.jsx';

const Delete = ({ blog }) => {
	const user = useUserStore();
	const { del } = useBlogActions();
	const notif = setNotification();
	if (user.username !== blog.addedBy) {
		return (
			<>
			</>
		);
	}
	const handleDel = async () => {
		try {
			if (!window.confirm(`delete blogpost "${blog.title}"?`)){
				return;
			}
			const id = blog.id;
			 await del(user.token, id);
			 notif('deleted a blog');
		} catch(e) {
			setNotif(`issue deleting blog ${blog.name}. ${e.error}`, true);
			console.log(e);
		}
	};
	return (
		<>
			<Button onClick={handleDel}> delete </Button>
		</>
	);
};

export default Delete;
