import React, { useCallback, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import { Form, Breadcrumb, Button, Row, Col } from 'react-bootstrap';

export const ContactCreate = () => {
	const [contact, setContact] = useState();
	const [form, setForm] = useState({
		id: Date.now(),
		name: '',
		username: '',
		email: '',
		address_street: '',
		address_suite: '',
		address_city: '',
		address_zipcode: '',
		address_geo_lat: '',
		address_geo_lng: '',
		phone: '',
		website: '',
		company_name: '',
		company_catchPhrase: '',
	});

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const saveHandler = useCallback(() => {
		setContact({
			id: form.id,
			name: form.name,
			username: form.username,
			email: form.email,
			address: {
				street: form.address_street,
				suite: form.address_suite,
				city: form.address_city,
				zipcode: form.address_zipcode,
				geo: {
					lat: form.address_geo_lat,
					lng: form.address_geo_lng,
				},
			},
			phone: form.phone,
			website: form.website,
			company: {
				name: form.company_name,
				catchPhrase: form.company_catchPhrase,
			},
		});
	}, [form]);

	const addMyContacts = () => {
		setContact({
			id: Date.now(),
			name: 'Vitaly Chalin',
			username: 'Okkey45',
			email: 'info@chalinclub.ru',
			address: {
				street: '',
				suite: '',
				city: 'Kurgan',
				zipcode: '640000',
				geo: {
					lat: '55.441004',
					lng: '65.341118',
				},
			},
			phone: '+7 904 949 3315',
			website: 'chalinclub.ru',
			company: {
				name: 'ChalinClub',
				catchPhrase: '',
			},
		});
	};

	if (contact) {
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
					<h3 className="mb-3">{contact.username}</h3>
					<span>{contact.email}</span>
					<span>{contact.phone}</span>
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
									zoom: 13,
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
	}

	return (
		<>
			<div className="header header__content py-2 d-flex">
				<h1>Add Contact</h1>
				<Button className="ml-auto" onClick={addMyContacts}>
					Add My Contacts
				</Button>
			</div>
			<Breadcrumb>
				<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
				<Breadcrumb.Item href="/contacts">All contacts</Breadcrumb.Item>
				<Breadcrumb.Item active>Add contact</Breadcrumb.Item>
			</Breadcrumb>
			<div className="contact__wrp contact__wrp--add-contact">
				<Form className="form from__create--contact">
					<Form.Group className="fieldset">
						<h5>Main Info</h5>
						{Object.keys(form)
							.filter((elem) => elem !== 'id')
							.filter((elem) => !elem.includes('address'))
							.filter((elem) => !elem.includes('company'))
							.map((el, i) => {
								return (
									<Form.Control
										key={i}
										type="text"
										name={el}
										value={form.el}
										onChange={changeHandler}
										placeholder={el.replace('_', ' ').toLocaleLowerCase()}
									/>
								);
							})}
					</Form.Group>
					<Form.Group className="fieldset">
						<h5>Address</h5>
						{Object.keys(form)
							.filter((elem) => elem.includes('address'))
							.map((el, i) => {
								return (
									<Form.Control
										key={i}
										type="text"
										name={el}
										value={form.el}
										onChange={changeHandler}
										placeholder={el.replace('address_', '').toLocaleLowerCase()}
									/>
								);
							})}
					</Form.Group>
					<Form.Group className="fieldset">
						<h5>Company</h5>
						{Object.keys(form)
							.filter((elem) => elem.includes('company'))
							.map((el, i) => {
								return (
									<Form.Control
										key={i}
										type="text"
										name={el}
										value={form.el}
										onChange={changeHandler}
										placeholder={el.replace('company_', '').toLocaleLowerCase()}
									/>
								);
							})}
					</Form.Group>
					<div className="btn__wrp py-3 text-right">
						<Button
							onClick={saveHandler}
							disabled={form.name ? '' : 'disabled'}
						>
							Save
						</Button>
						<Button
							className="ml-2"
							type="reset"
							value="Reset"
							variant="secondary"
						>
							Cancel
						</Button>
					</div>
				</Form>
			</div>
		</>
	);
};
