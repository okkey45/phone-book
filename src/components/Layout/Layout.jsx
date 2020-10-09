import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar';

import { Container, Row, Col } from 'react-bootstrap';

export const Layout = ({ pageContent }) => {
	return (
		<Container fluid>
			<Row>
				<Col lg={3} className="px-0 vh100">
					<Sidebar />
				</Col>
				<Col lg={9} className="vh100">
					{pageContent}
				</Col>
			</Row>
		</Container>
	);
};
