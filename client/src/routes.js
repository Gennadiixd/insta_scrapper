import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Signin from './user/signin';
import Signup from './user/signup';
import Dashboard from './user/userDashboard';
import AdminDashboard from './user/adminDashboard';
import Home from './core/home';
import PrivateRoute from './auth/privateRoute';
import AdminRoute from './auth/adminRoute';
import AddCategory from './admin/addCategory';
import AddProduct from './admin/addProduct';
import DirectPage from './pages/direct';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import LayoutMain from './layouts/layout-main';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <LayoutMain>
                    <PrivateRoute path="/" exact component={MainPage} />
                    <Route path="/login" exact component={LoginPage} />
                    <PrivateRoute path="/direct" exact component={DirectPage} />
                </LayoutMain>
                {/* <Route path="/chat" exact component={ChatPage} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/signup" exact component={Signup} />
                    <PrivateRoute
                        path="/user/dashboard"
                        exact
                        Component={Dashboard}
                    />
                    <AdminRoute
                        path="/admin/dashboard"
                        exact
                        Component={AdminDashboard}
                    />
                    <AdminRoute
                        path="/create/category"
                        exact
                        component={AddCategory}
                    />
                    <AdminRoute
                        path="/create/product"
                        exact
                        component={AddProduct}
                    /> */}
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

