import React, { useState, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { Spinner, Breadcrumb, Card, Form, Alert } from 'react-bootstrap';
import { ReactComponent as IconTrash } from '../../img/trash.svg';

export const Contacts = () => {
	const [contacts, setContacts] = useState();
	const [showAlert, setShowAlert] = useState(false);
	const [form, setForm] = useState({
		name: '',
	});

	const findContactHandler = (event) => {
		if (event.key === 'Enter' && form.name) {
			const filteredContacts = [];

			contacts.map((contact) =>
				contact.name.includes(form.name) ? filteredContacts.push(contact) : '',
			);

			if (filteredContacts.length > 0) {
				setContacts(filteredContacts);
				setForm({ ...form, name: '' });
			} else {
				setShowAlert(true);
				setForm({ ...form, name: '' });
				getContacts();
				setTimeout(() => {
					setShowAlert(false);
				}, 3000);
			}
		}
	};

	const getContacts = useCallback(async () => {
		try {
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/users',
			);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			}

			data.sort((a, b) => {
				if (a.name > b.name) {
					return 1;
				}
				if (a.name < b.name) {
					return -1;
				}

				return 0;
			});

			setContacts(data);
		} catch (e) {}
	}, []);

	useEffect(() => {
		getContacts();
	}, [getContacts]);

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const removeContactHandler = (event) => {
		contacts.splice(
			contacts.map((el) => el.id.toString()).indexOf(event.target.dataset.id),
			1,
		);
		const newArr = contacts.slice();
		setContacts(newArr);
	};

	if (!contacts) return <Spinner animation="border" />;

	return (
		<>
			<div className="header header__content py-2">
				<h1>All contacts</h1>
			</div>
			<Breadcrumb>
				<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
				<Breadcrumb.Item active>All contacts</Breadcrumb.Item>
			</Breadcrumb>
			<Form.Control
				type="text"
				name="name"
				className="find-contact__simple mb-3"
				placeholder="Find Contact"
				value={form.name}
				onChange={changeHandler}
				onKeyPress={findContactHandler}
			/>
			{showAlert && (
				<Alert variant="danger" onClick={() => setShowAlert(false)} dismissible>
					<Alert.Heading>Not Found</Alert.Heading>
				</Alert>
			)}
			<div className="card-wrapper">
				{contacts.map((el, i) => {
					return (
						<Card className="mb-4" key={i}>
							<IconTrash
								className="icon__trash"
								title="Remove Contact"
								data-id={el.id}
								onClick={removeContactHandler}
							/>
							<NavLink to={`/detail/${el.id}`} className="card-img-wrp">
								<Card.Img variant="left" src="https://via.placeholder.com/64" />
								<span>{el.username}</span>
							</NavLink>
							<Card.Body>
								<Card.Title>
									<NavLink to={`/detail/${el.id}`}>{el.name}</NavLink>
								</Card.Title>
								<Card.Text>
									<span>{el.email}</span>
									<span>{el.phone}</span>
								</Card.Text>
							</Card.Body>
						</Card>
					);
				})}
			</div>
		</>
	);
};
