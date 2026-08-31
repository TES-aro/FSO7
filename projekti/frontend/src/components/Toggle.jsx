import { useState, useImperativeHandle } from 'react';

const Toggle = (props) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };
	const cancelLabel = props.cancelLabel ? props.cancelLabel : 'cancel';

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(props.ref, () => {
		return { toggleVisibility };
	});

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>{cancelLabel}</button>
			</div>
		</div>
	);
};

export default Toggle;
