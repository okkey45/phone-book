import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';

export const Sidebar = () => {
	const [form, setForm] = useState({
		contactName: '',
	});

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	return (
		<div className="sidebar">
			<Navbar bg="dark" variant="dark" className="bg-dark-l">
				<Navbar.Brand href="/">
					<span className="navbar-brand__text text-center">Phone Book</span>
					<img
						src={require('../../img/John-Smith-avatar.jpg')}
						className="navbar-brand__img"
						alt="John Smith"
					/>
					<span className="navbar-brand__userName">John Smith</span>
				</Navbar.Brand>
				<Form className="form__find-contact">
					<FormControl
						type="text"
						className="form__find-contact--input"
						placeholder="Search"
						name="contactName"
						value={form.contactName}
						onChange={changeHandler}
					/>
				</Form>
				<Nav>
					<Nav.Item>
						<NavLink to={'/contacts'} className="nav-link">
							All contacts
						</NavLink>
						<NavLink to={'/create'} className="nav-link">
							Add contact
						</NavLink>
					</Nav.Item>
				</Nav>
			</Navbar>
		</div>
	);
};
