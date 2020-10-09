import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { ContactEditFormField } from './ContactEditFormField';

import { Spinner, Breadcrumb, Row, Col } from 'react-bootstrap';

export const ContactDetail = () => {
	const contactId = useParams().id;
	const [contact, setContact] = useState();
	const [form, setForm] = useState({
		name: '',
		username: '',
		email: '',
		phone: '',
	});

	const getContact = useCallback(async () => {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/users/${contactId}`,
			);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			}

			setContact(data);
			setForm({
				name: data.name,
				username: data.username,
				email: data.email,
				phone: data.phone,
			});
		} catch (e) {}
	}, [contactId]);

	useEffect(() => {
		getContact();
	}, [getContact, contactId]);

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const contactFieldSaveHandler = (event) => {
		event.preventDefault();

		setContact({
			...contact,
			[event.target.name]: form[event.target.name],
		});
	};

	const contactFieldCancelHandler = (event) => {
		event.preventDefault();

		setForm({
			...form,
			[event.target.name]: contact[event.target.name],
		});
	};

	if (!contact) return <Spinner animation="border" />;

	return (
		<>
			<div className="header header__content py-2">
				<h1>{contact.name}</h1>
			</div>
			<Breadcrumb className="big-mb">
				<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
				<Breadcrumb.Item href="/contacts">All contacts</Breadcrumb.Item>
				<Breadcrumb.Item active>{contact.name}</Breadcrumb.Item>
			</Breadcrumb>
			<div className="contact__wrp contact__main-info--wrp">
				<img
					src="https://via.placeholder.com/150"
					className="contact__img"
					alt={contact.username}
				/>
				<ContactEditFormField
					contact={contact}
					form={form}
					fieldName={'username'}
					formGroupClassName={'mb-3'}
					labelClassName={'h3'}
					changeHandler={changeHandler}
					contactFieldSaveHandler={contactFieldSaveHandler}
					contactFieldCancelHandler={contactFieldCancelHandler}
				/>
				<ContactEditFormField
					contact={contact}
					form={form}
					fieldName={'email'}
					formGroupClassName={''}
					labelClassName={''}
					changeHandler={changeHandler}
					contactFieldSaveHandler={contactFieldSaveHandler}
					contactFieldCancelHandler={contactFieldCancelHandler}
				/>
				<ContactEditFormField
					contact={contact}
					form={form}
					fieldName={'phone'}
					formGroupClassName={''}
					labelClassName={''}
					changeHandler={changeHandler}
					contactFieldSaveHandler={contactFieldSaveHandler}
					contactFieldCancelHandler={contactFieldCancelHandler}
				/>
			</div>
			<Row className="contact__wrp">
				<Col lg={4}>
					<h4>Address</h4>
					<div className="contact__address mb-3">
						<span className="contact__address--zip">
							{contact.address.zipcode}
						</span>
						<span className="contact__address--street">
							{contact.address.street}
						</span>
						<span className="contact__address--suite">
							{contact.address.suite}
						</span>
						<span className="contact__address--city">
							{contact.address.city}
						</span>
					</div>
					<h4>Website</h4>
					<div className="contact__website mb-3">{contact.website}</div>
					<h4>Company</h4>
					<div className="contact__company mb-3">
						<span className="contact__company--name">
							{contact.company.name}
						</span>
						<span className="contact__company--catchPhrase">
							{contact.company.catchPhrase}
						</span>
					</div>
				</Col>
				<Col lg={8}>
					<YMaps>
						<Map
							defaultState={{
								center: [contact.address.geo.lat, contact.address.geo.lng],
								zoom: 3,
							}}
							style={{ width: '100%', height: '400px' }}
						>
							<Placemark
								defaultGeometry={[
									contact.address.geo.lat,
									contact.address.geo.lng,
								]}
							/>
						</Map>
					</YMaps>
				</Col>
			</Row>
		</>
	);
};
