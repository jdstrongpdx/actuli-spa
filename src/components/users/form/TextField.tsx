import React from "react";
import { Form } from "react-bootstrap";

interface TextFieldProps {
    formLabel: string;
    fieldName: string;
    formik: any; // Replace `any` with the correct Formik type if strongly typing is required
}

const TextField: React.FC<TextFieldProps> = ({ formLabel, fieldName, formik }) => {
    return (
        <Form.Group className="mb-3" controlId={`form${fieldName}`}>
            <Form.Label><strong>{formLabel}</strong></Form.Label>
            <Form.Control
                type="text"
                {...formik.getFieldProps(fieldName)}
                isInvalid={Boolean(formik.touched[fieldName] && formik.errors[fieldName])}
            />
            <Form.Control.Feedback type="invalid">
                {formik.errors[fieldName]}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default TextField;