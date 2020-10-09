import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { ContactDetail } from '../components/Contact/ContactDetail';

export const ContactDetailPage = () => {
	return (
		<Layout pageTitle={'Contact Detail Page'} pageContent={<ContactDetail />} />
	);
};
