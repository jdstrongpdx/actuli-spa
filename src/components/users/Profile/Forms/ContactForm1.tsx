import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import AppUser, {Contact} from "../../../../interfaces/AppUser";
import {ApiRoutes} from "../../../../config/apiRoutes";
import {useTypes} from "../../../../contexts/TypesContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";

interface ContactForm1Props {
    userData: AppUser | null,
    error: Error | null,
    updateUser: (route: string, data: Partial<AppUser>) => Promise<void>,
}

const initialValues: Contact = {
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    dateOfBirth: "",
    homePhone: "",
    mobilePhone: "",
    website: "",
};

const ContactForm1: React.FC<ContactForm1Props> = ({ userData, error, updateUser }) => {
    const {typesData} = useTypes();
    const navigate = useNavigate();

    const ValidationSchema = () =>
        Yup.object().shape({
            email: Yup.string().email('Invalid email'),
            firstName: Yup.string().required('First Name is required.'),
            lastName: Yup.string().required('Last Name is required.'),
            address1: Yup.string().optional().nullable(),
            address2: Yup.string().optional().nullable(),
            city: Yup.string().optional().nullable(),
            state: Yup.string().optional().nullable(),
            postalCode: Yup.string().optional().nullable(),
            country: Yup.string().optional().nullable(),
            dateOfBirth: Yup.date().required('Date of Birth is required.'),
            homePhone: Yup.string()
                .optional()
                .nullable()
                .matches(/^[0-9]+$/, 'Phone number must only contain digits')
                .min(10, 'Phone number must be at least 10 digits')
                .max(15, 'Phone number must not exceed 15 digits'),
            mobilePhone: Yup.string()
                .optional()
                .nullable()
                .matches(/^[0-9]+$/, 'Phone number must only contain digits')
                .min(10, 'Phone number must be at least 10 digits')
                .max(15, 'Phone number must not exceed 15 digits'),
            website: Yup.string().url('Invalid URL').nullable(),
        });

    const formik = useFormik({
        initialValues,
        validationSchema: ValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                handleSubmit(values);
            } catch (error) {
                console.error("Error submitting form:", error);
            } finally {
                setSubmitting(false); // Ensure the button reactivates
            }
        },
    });

    useEffect(() => {
        if (userData && userData.profile.contact) {
            // data normalized in context
            formik.setValues(userData.profile.contact);
        }
    }, [])

    const handleSubmit = async (values: Contact) => {
        // Data is normalized in the context before submission
        await updateUser(ApiRoutes.UpdateUserContact, values as Partial<AppUser>);
        if (error){
            if (error.message) {
                throw new Error("Error Updating Contact: " + error.message);
            } else {
                throw new Error("An unknown error occurred.");
            }
        }
        else {
            toast.success("Contact Updated Successfully");
            navigate("/user?tab=1");
        }
    };

    // RENDER JSX RETURN
    if (!userData || !typesData) {
        return <>Loading...</>;
    }

    return (
        <div className="App">
            <Form noValidate onSubmit={formik.handleSubmit}>
                <fieldset>
                    <h2>Contact Edit</h2>

                    {/* First Name */}
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('firstName')}
                            isInvalid={Boolean(formik.touched.firstName && formik.errors.firstName)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Last Name */}
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('lastName')}
                            isInvalid={Boolean(formik.touched.lastName && formik.errors.lastName)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('email')}
                            isInvalid={Boolean(formik.touched.email && formik.errors.email)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Address 1 */}
                    <Form.Group className="mb-3" controlId="formAddress1">
                        <Form.Label>Address 1</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('address1')}
                            isInvalid={Boolean(formik.touched.address1 && formik.errors.address1)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.address1}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Address 2 */}
                    <Form.Group className="mb-3" controlId="formAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('address2')}
                            isInvalid={Boolean(formik.touched.address2 && formik.errors.address2)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.address2}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* City */}
                    <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('city')}
                            isInvalid={Boolean(formik.touched.city && formik.errors.city)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.city}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* State */}
                    <Form.Group className="mb-3" controlId="formState">
                        <Form.Label>State/Province</Form.Label>
                        <Form.Control
                            as="select"
                            {...formik.getFieldProps('state')}
                            isInvalid={Boolean(formik.touched.state && formik.errors.state)}
                        >
                            <option value="">Select a State/Province</option>
                            {typesData.states.data.map((value, index) => (
                                <option key={index} value={value.id}>
                                    {value.value}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.state}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Postal Code */}
                    <Form.Group className="mb-3" controlId="formPostalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('postalCode')}
                            isInvalid={Boolean(formik.touched.postalCode && formik.errors.postalCode)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.postalCode}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Country */}
                    <Form.Group className="mb-3" controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            as="select"
                            {...formik.getFieldProps('country')}
                            isInvalid={Boolean(formik.touched.country && formik.errors.country)}
                        >
                            <option value="">Select a Country</option>
                            {typesData.countries.data.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.value}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.country}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Mobile Phone Number */}
                    <Form.Group className="mb-3" controlId="formMobilePhone">
                        <Form.Label>Mobile Phone</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('mobilePhone')}
                            isInvalid={Boolean(formik.touched.mobilePhone && formik.errors.mobilePhone)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.mobilePhone}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Home Phone Number */}
                    <Form.Group className="mb-3" controlId="formHomePhone">
                        <Form.Label>Home Phone</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('homePhone')}
                            isInvalid={Boolean(formik.touched.homePhone && formik.errors.homePhone)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.homePhone}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Website */}
                    <Form.Group className="mb-3" controlId="formWebsite">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('website')}
                            isInvalid={Boolean(formik.touched.website && formik.errors.website)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.website}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* TODO: Date is not parsing correctly on load */}
                    {/* Date of Birth */}
                    <Form.Group className="mb-3" controlId="formDateOfBirth">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            {...formik.getFieldProps('dateOfBirth')}
                            isInvalid={Boolean(formik.touched.dateOfBirth && formik.errors.dateOfBirth)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.dateOfBirth}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Submitting..." : "Update Contact"}
                    </Button>
                </fieldset>
            </Form>
        </div>
    );
};

export default ContactForm1;