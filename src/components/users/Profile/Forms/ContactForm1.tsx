import {ChangeEvent, useEffect, useRef, useState} from "react";
import { Form, Button } from "react-bootstrap";
import {replaceEmptyStringWithNull, replaceNullWithEmptyString} from "../../../../utilities/normalizationUtilities";
import AppUser, {Contact} from "../../../../interfaces/AppUser";
import {ApiRoutes} from "../../../../config/apiRoutes";
import {useTypes} from "../../../../contexts/TypesContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

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
    const [formData, setFormData] = useState<Contact>(initialValues);
    const [loading, setLoading] = useState(false);
    const {typesData} = useTypes();
    const navigate = useNavigate();

    useEffect(() => {
        if (userData && userData.profile.contact) {
            // data normalized in context
            setFormData(userData.profile.contact);
        }
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevProfile: Contact) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Normalize and prepare the data for submission
            const normalizedData: any = replaceEmptyStringWithNull(formData);
            await updateUser(ApiRoutes.UpdateUserContact, normalizedData);
            toast.success("Contact Updated Successfully");
            navigate("/user?tab=1");

            // TODO: errors are not being blocked/handled
        } catch (error) {
            if (error instanceof Error) {
                toast.error("Error Updating Contact: " + error);
            } else {
                toast.error("An unknown error occurred.")
            }
        } finally {
            setLoading(false);
        }
    };

    if (!userData || !typesData) {
        return <>Loading...</>;
    }

    return (
        <div className="App">
            <Form onSubmit={handleSubmit}>
                <fieldset>
                    <h2>Contact Edit</h2>

                    {/* First Name */}
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>
                            First name <sup>*</sup>
                        </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            value={formData?.firstName || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Last Name */}
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>
                            Last name <sup>*</sup>
                        </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                            value={formData?.lastName || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="your-email@example.com"
                            name="email"
                            value={formData?.email || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Address 1 */}
                    <Form.Group className="mb-3" controlId="formAddress1">
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Address Line 1"
                            name="address1"
                            value={formData?.address1 || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Address 2 */}
                    <Form.Group className="mb-3" controlId="formAddress2">
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Address Line 2"
                            name="address2"
                            value={formData?.address2 || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* City */}
                    <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="City"
                            name="city"
                            value={formData?.city || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* State */}
                    <Form.Group className="mb-3" controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Select
                            name="state"
                            value={formData?.state || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select a State</option>
                            {typesData.states.data.map((state) => (
                                <option key={state.id} value={state.value}>
                                    {state.value}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Postal Code */}
                    <Form.Group className="mb-3" controlId="formPostalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Postal Code"
                            name="postalCode"
                            value={formData?.postalCode || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Country */}
                    <Form.Group className="mb-3" controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Select
                            name="country"
                            value={formData?.country || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select an Country</option>
                            {typesData.countries.data.map((country) => (
                                <option key={country.id} value={country.value}>
                                    {country.value}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Mobile Phone Number */}
                    <Form.Group className="mb-3" controlId="formMobilePhone">
                        <Form.Label>Mobile Phone Number</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Mobile Phone"
                            name="mobilePhone"
                            value={formData?.mobilePhone || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Home Phone Number */}
                    <Form.Group className="mb-3" controlId="formHomePhone">
                        <Form.Label>Home Phone Number</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Home Phone"
                            name="homePhone"
                            value={formData?.homePhone || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Website */}
                    <Form.Group className="mb-3" controlId="formWebsite">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="url"
                            placeholder="Website URL"
                            name="website"
                            value={formData?.website || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* TODO: Date is not parsing correctly on load */}
                    {/* Date of Birth */}
                    <Form.Group className="mb-3" controlId="formDateOfBirth">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter your date of birth"
                            name="dateOfBirth"
                            value={formData?.dateOfBirth || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        Update Contact
                    </Button>
                </fieldset>
            </Form>
        </div>
    );
};

export default ContactForm1;