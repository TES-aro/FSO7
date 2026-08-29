import { render, screen } from '@testing-library/react';
import Blog from '../src/components/Blog.jsx';
import userEvent from '@testing-library/user-event';

const fakeBlog = {
	title: 'some title',
	author: 'author',
	likes: 0,
	url: 'http://url.com',
	addedBy: 'somebody'
};

test('renders content', () => {

	render(<Blog blog={fakeBlog} />);

	const urlElement = screen.getByText(fakeBlog.url);
	expect(urlElement).not.toBeVisible();
	const authorElement = screen.getAllByText(`${fakeBlog.title} by ${fakeBlog.author}`, { exact: false });
	expect(authorElement[0]).toBeVisible();
	expect(authorElement[1]).not.toBeVisible();
});

test('pressing button changes rendered content', async () => {
	render(<Blog blog={fakeBlog} />);

	const likesOriginal = screen.getByText('likes', { exact: false });
	expect(likesOriginal).not.toBeVisible();
	const user = userEvent.setup();
	const button = screen.getByText('show more', { exact: false });
	await user.click(button);

	const likesNew = screen.getByText('likes', { exact: false });
	expect(likesNew).toBeVisible();
});

test('pressing like button :3', async () => {
	const mockHandler = vi.fn();
	render(<Blog blog={fakeBlog} setNotif={mockHandler}/>);

	const user = userEvent.setup();
	const button = screen.getByText('show more', { exact: false });
	await user.click(button);

	const likeButton = screen.getByText('like');
	await user.click(likeButton);
	await user.click(likeButton);

	expect(mockHandler.mock.calls).toHaveLength(2);

});
