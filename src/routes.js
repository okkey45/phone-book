import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ContactsPage } from './pages/ContactsPage';
import { ContactCreatePage } from './pages/ContactCreatePage';
import { ContactEditPage } from './pages/ContactEditPage';
import { ContactDetailPage } from './pages/ContactDetailPage';

export const useRoutes = () => {
	return (
		<Switch>
			<Route path="/contacts" exact>
				<ContactsPage />
			</Route>
			<Route path="/create" exact>
				<ContactCreatePage />
			</Route>
			<Route path="/edit/:id">
				<ContactEditPage />
			</Route>
			<Route path="/detail/:id">
				<ContactDetailPage />
			</Route>
			<Redirect to="/contacts" exact />
		</Switch>
	);
};
