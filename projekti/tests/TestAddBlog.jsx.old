import { useState } from 'react';

const TestAddBlog = ({ tester, user }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	if (!user) {
		return (
			<>
			</>
		);
	}
	const handleSubmit = async (event) => {
		event.preventDefault();
		try{
			const newBlog = {
				title: title,
				author: author,
				url: url
			};
			tester(newBlog);
			setTitle('');
			setAuthor('');
			setUrl('');
		} catch(e) {
			console.log('an error within handleSubmit of TestAddBlog');
			console.error(e);
		}

	};

	return (
		<>
			<h2> add a blog </h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						title
						<input
							type='text'
							value={title}
							onChange={({ target }) => setTitle(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						author
						<input
							type='text'
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						url
						<input
							type='text'
							value={url}
							onChange={({ target }) => setUrl(target.value)}
						/>
					</label>
				</div>
				<button type='submit'>add</button>
			</form>
		</>
	);
};

export default TestAddBlog;
