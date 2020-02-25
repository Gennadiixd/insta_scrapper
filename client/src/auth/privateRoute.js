import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const renderCmp = (authPredicate, Cmp) => (props) => {
	const isAuth = authPredicate();
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
	const [{ t: token }] = useCookies();

	return (
		<Route
			{...restProps}
			render={renderCmp(() => !!token, Component)}
		/>
	)
}
