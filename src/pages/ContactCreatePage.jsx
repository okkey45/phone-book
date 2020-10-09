import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { ContactCreate } from '../components/Contact/ContactCreate';

export const ContactCreatePage = () => {
	return (
		<Layout pageTitle={'Contact Create Page'} pageContent={<ContactCreate />} />
	);
};
