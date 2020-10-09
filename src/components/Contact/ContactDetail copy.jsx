import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import { Spinner, Breadcrumb, Row, Col } from 'react-bootstrap';

export const ContactDetail = () => {
	const contactId = useParams().id;
	const [contact, setContact] = useState();

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
		} catch (e) {}
	}, [contactId]);

	useEffect(() => {
		getContact();
	}, [getContact, contactId]);

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
				<h3>{contact.username}</h3>
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
