import Message from './Message.jsx';

const Notification = ({ notification }) => {
	const error = false;
	return(
		<>
			<Message className='notification' isError={error} message={notification} />
		</>
	);

};

export default Notification;
