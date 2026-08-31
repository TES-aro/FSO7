import React from 'react';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError : false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDitdCatch(error, info) {
		console.error('error caught', error, info);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h2> Something went wrong </h2>
					<p>{this.state.error.message}</p>
					<button onClick={() => this.setState({ hasError: false, error: null })}>
            try again
					</button>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
