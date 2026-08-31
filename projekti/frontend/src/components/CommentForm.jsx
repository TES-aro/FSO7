import { TextField, Button } from '@mui/material';
import { useBlogActions, setNotification } from '../store';
import { useState } from 'react';

const CommentForm = ({ id }) => {
	const [state, setState] = useState('');
	const { comment } = useBlogActions();
	const notify = setNotification();
	const handleComment = async (e) => {
		e.preventDefault();
		try {
			const ref = comment(state, id);
			console.log(ref);
			notify('comment send');
			setState('');
		} catch(e) {
			notify('issue with sending a comment');
		}

	};
	return (
		<>
			<form onSubmit={handleComment}>
				<TextField
					label='comment'
					id='comment-form'
					type='text'
					value={state}
					onChange={({ target }) => setState(target.value)}
				/>
				<Button
					type='dubmit'
					variant='contained'
					style={{ marginTop: 10 }}
				>
          submit
				</Button>
			</form>
		</>
	);
};

export default CommentForm;
