import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './auth/privateRoute';
import DirectPage from './pages/direct';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import LayoutMain from './layouts/layout-main';

const Routes = () => {
	return (
		<Switch>
			<LayoutMain>
				<PrivateRoute path="/" exact component={MainPage} />
				<PrivateRoute path="/direct" exact component={DirectPage} />
				<Route path="/login" exact component={LoginPage} />
			</LayoutMain>
		</Switch>
	)
}

export default Routes;

