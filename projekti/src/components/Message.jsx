import { Alert } from '@mui/material';

const Message = ({ message, isError }) => {
	if (message === null) {
		return (
			<>
			</>
		);
	}
	if (isError) {
		console.log('lol');
		console.log(message);
		return (
			<Alert severity='info'>
				{message}
			</Alert>
		);
	}
	return (
		<Alert severity='info'>
			{message}
		</Alert>
	);
};

export default Message;
