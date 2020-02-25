import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const renderCmp = (Cmp) => (props) => {
	const token = Cookies.get('t');
	const isAuth = !!token;

	const redirectProps = {
		pathname: '/login',
		state: props.location
	};

	return (
		isAuth
			? <Cmp {...props} />
			: <Redirect to={redirectProps} />
	)
};

export default function PrivateRoute({ component: Component, ...restProps }) {
	return (
		<Route
			{...restProps}
			render={renderCmp(Component)}
		/>
	)
}
