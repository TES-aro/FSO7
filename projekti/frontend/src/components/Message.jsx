import { Alert } from '@mui/material';
import { useNotification } from '../store.jsx';

const Message = () => {
	const notification = useNotification();
	if (notification === '') {
		return null;
	}
	return(
		<Alert severity='info'> {notification} </Alert>
	);
};
export default Message;
