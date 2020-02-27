import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './auth/privateRoute';
import DirectPage from './pages/direct';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import LayoutMain from './layouts/layout-main';
import WSProvider from './ws/ws-provider';

const Routes = () => {
	return (
		<Switch>
			<LayoutMain>
				<WSProvider>
					<PrivateRoute path="/" exact component={MainPage} />
					<PrivateRoute path="/direct" exact component={DirectPage} />
				</WSProvider>
				<Route path="/login" exact component={LoginPage} />
			</LayoutMain>
		</Switch>
	)
}

export default Routes;

