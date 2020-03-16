import React from 'react';

const higherOrderComponent = config => WrappedComponent => {
	return class HOC extends React.Component {
		setItem(key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		}

		getItem(key) {
			return JSON.parse(localStorage.getItem(key));
		}

		render() {
			return (
				<WrappedComponent
					getItem={this.getItem}
					setItem={this.setItem}
					{...this.props}
				/>
			);
		}
	};
};

export default higherOrderComponent;
