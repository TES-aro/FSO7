import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';

const CommentList = ({ comments }) => {
	if (!comments){
		return null;
	}

	return (
		<>
			<List>
				<ListSubheader id="comments-list">
          Comments
				</ListSubheader>
				{comments.map((c, index) => {
					return(
						<ListItem key={index} divider='true' alignItems='flex-sstart'> {c} </ListItem>
					);
				})}
			</List>
		</>
	);
};

export default CommentList;
