import React from "react";
import { Form } from "react-bootstrap";

interface SelectFieldProps {
    formLabel: string; // The label for the field
    fieldName: string; // The Formik field name (e.g., 'country')
    list: { id: string | number; value: string }[]; // Array of options (e.g., countries)
    formik: any; // Replace with the exact Formik type, if needed
}

const SelectField: React.FC<SelectFieldProps> = ({ formLabel, fieldName, list, formik }) => {
    return (
        <Form.Group className="mb-3" controlId={`form${fieldName}`}>
            <Form.Label><strong>{formLabel}</strong></Form.Label>
            <Form.Control
                as="select"
                {...formik.getFieldProps(fieldName)}
                isInvalid={Boolean(formik.touched[fieldName] && formik.errors[fieldName])}
            >
                <option value="">Select a {formLabel}</option>
                {list.map((option, index) => (
                    <option key={index} value={option.id}>
                        {option.value}
                    </option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
                {formik.errors[fieldName]}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default SelectField;