import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { Contacts } from '../components/Contact/Contacts';

export const ContactsPage = () => {
	return <Layout pageContent={<Contacts />} />;
};
