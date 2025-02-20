import React from "react";
import { Form } from "react-bootstrap";

interface DateFieldProps {
    formLabel: string; // The label for the field
    fieldName: string; // The Formik field name
    formik: any; // Replace with the exact Formik type if necessary
}

const DateField: React.FC<DateFieldProps> = ({ formLabel, fieldName, formik }) => {
    return (
        <Form.Group className="mb-3" controlId={`form${fieldName}`}>
            <Form.Label><strong>{formLabel}</strong></Form.Label>
            <Form.Control
                type="date"
                {...formik.getFieldProps(fieldName)}
                isInvalid={Boolean(formik.touched[fieldName] && formik.errors[fieldName])}
            />
            <Form.Control.Feedback type="invalid">
                {formik.errors[fieldName]}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default DateField;