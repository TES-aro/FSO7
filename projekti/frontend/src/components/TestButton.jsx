export const TestButton = ({ addNotification }) => {

	const testNotif = () => {
		addNotification('this is a test');
	};
	return(
		<>
			<button onClick={testNotif}> add notification </button>
		</>
	);
};
