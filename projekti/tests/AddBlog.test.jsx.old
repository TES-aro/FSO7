import { render, screen } from '@testing-library/react';
import TestAddBlog from './TestAddBlog.jsx';
import userEvent from '@testing-library/user-event';

const fakeBlog = {
	title: 'Very Special Title',
	author: 'An Unknown Author',
	likes: 0,
	url: 'http://foo.bar/unknown/VerySpecialTitle',
};

test('adding a new blog will be done with right information', async () => {
	const user = userEvent.setup();
	const createBlog = vi.fn();

	render(<TestAddBlog tester={createBlog} user={'Mario'} />);

	const title = screen.getByLabelText('title');
	const author = screen.getByLabelText('author');
	const url = screen.getByLabelText('url');
	const button = screen.getByText('add');

	await user.type(title, fakeBlog.title);
	await user.type(author, fakeBlog.author);
	await user.type(url, fakeBlog.url);

	await user.click(button);
	console.log('----------\n\n\n                   -----\n\n\n');
	console.log(createBlog.mock.calls);
	expect(createBlog.mock.calls).toHaveLength(1);
	const newBlog = createBlog.mock.calls[0][0];
	expect(newBlog.title).toBe(fakeBlog.title);
	expect(newBlog.author).toBe(fakeBlog.author);
	expect(newBlog.url).toBe(fakeBlog.url);
});
