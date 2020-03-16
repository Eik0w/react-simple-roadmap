import React from 'react';

const higherOrderComponent = WrappedComponent => {
	class HOC extends React.Component {
		render() {
			const { label = 'toto', ...rest } = this.props;

			return (
				<div>
					<label>{label}</label>
					<WrappedComponent {...rest} />
				</div>
			);
		}
	}

	return HOC;
};

export default higherOrderComponent;
