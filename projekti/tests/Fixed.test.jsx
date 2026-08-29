import { render, screen } from '@testing-library/react';
import BlogView from '../src/components/BlogView.jsx';
import userEvent from '@testing-library/user-event';

const fakeBlog = {
	title: 'some title',
	author: 'author',
	likes: 0,
	url: 'http://url.com',
	addedBy: 'somebody',
	id: 1
};

const someUser = {
	username: 'nobody'
};

const rightUser = {
	username: 'somebody'
};

test('not logged in', () => {
	render(<BlogView blog={fakeBlog} />);

	const urlElement = screen.queryByRole('button', { name:'like' });
	expect(urlElement).not.toBeTruthy();
	const deleteButton = screen.queryByRole('button', { name:'delete' });
	expect(deleteButton).not.toBeTruthy();
});

test('logged in, different user', () => {
	render(<BlogView blog={fakeBlog} user={someUser} />);

	const urlElement = screen.getByRole('button', { name:'like' });
	expect(urlElement).toBeVisible();
	const deleteButton = screen.queryByRole('button', { name:'delete' });
	expect(deleteButton).not.toBeTruthy();
});

test('logged in, same user', () => {
	render(<BlogView blog={fakeBlog} user={rightUser} />);

	const urlElement = screen.getByRole('button', { name:'like' });
	expect(urlElement).toBeVisible();
	const deleteButton = screen.getByRole('button', { name:'delete' });
	expect(deleteButton).toBeVisible();
});
