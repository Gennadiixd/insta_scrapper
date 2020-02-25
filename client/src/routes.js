import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './auth/privateRoute';
import DirectPage from './pages/direct';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import LayoutMain from './layouts/layout-main';
import { CookiesProvider } from 'react-cookie';

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<LayoutMain>
					<CookiesProvider>
						<PrivateRoute path="/" exact component={MainPage} />
						<PrivateRoute path="/direct" exact component={DirectPage} />
						<Route path="/login" exact component={LoginPage} />
					</CookiesProvider>
				</LayoutMain>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes;

