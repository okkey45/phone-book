import React from 'react';

import { Form, Button } from 'react-bootstrap';

export const ContactEditFormField = ({
	contact,
	form,
	fieldName,
	formGroupClassName,
	labelClassName,
	changeHandler,
	contactFieldSaveHandler,
	contactFieldCancelHandler,
}) => {
	return (
		<Form.Group
			className={`from__edit--contact ${formGroupClassName}`}
			controlId={`form__${fieldName}`}
		>
			<Form.Control
				type="text"
				name={fieldName}
				value={form[fieldName]}
				onChange={changeHandler}
			/>
			<Form.Label className={labelClassName}>{contact[fieldName]}</Form.Label>
			<div className="btn__group">
				<Button
					className="btn btn__contact btn__contact--save"
					name={fieldName}
					onClick={contactFieldSaveHandler}
				>
					&#128504;
				</Button>
				<Button
					className="btn btn__contact btn__contact--cancel"
					name={fieldName}
					type="reset"
					value="Reset"
					onClick={contactFieldCancelHandler}
				>
					&times;
				</Button>
			</div>
		</Form.Group>
	);
};
