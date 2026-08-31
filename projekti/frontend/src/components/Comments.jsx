import CommentList from './CommentList';
import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
	return (
		<div>
			<CommentList comments={blog.comments} />
			<CommentForm id={blog.id} />
		</div>
	);
};

export default Comments;
