import {ChangeEvent, useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { protectedResources } from "../../../authConfig";
import useFetchWithMsal from "../../../hooks/useFetchWithMsal";
import { replaceEmptyStringWithNull} from "../../../utilities/normalizationUtilities";
import {useUser} from "../../../contexts/UserContext";
import {Contact} from "../../../interfaces/AppUser";
import ToastStack from "../../../utilities/ToastStack";

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

const ProfileEdit = () => {
    const { userData, refetchUserData, userLoading } = useUser();
    const [formData, setFormData] = useState<any | null>(initialValues);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toastRef = useRef<ToastStackRef>(null);
    const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.user.scopes.read,
    });

    useEffect(() => {
        if (userData) {
            setFormData(userData.profile.contact);
        }
    }, [userData]);

    const refreshData = async () => {
        await refetchUserData(); // Refresh user data from API
        setFormData(userData); // Update the form with refreshed data
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Normalize and prepare the data for submission
            const normalizedData = replaceEmptyStringWithNull(formData);

            // Use `execute` to make the PUT request
            const response = await execute(
                "PUT",
                `${protectedResources.user.endpoint}profile/contact`,
                normalizedData
            );

            // Handle successful submission
            toastRef.current.addToast("success", "Profile updated successfully!");
        } catch (error) {
            // Handle submission errors
            console.error("Error during form submission:", error);

            // Check if a custom error object is returned from execute
            if (error instanceof Error) {
                toastRef.current.addToast("danger", error.message);
            } else {
                toastRef.current.addToast(
                    "danger",
                    "An unexpected error occurred. Please try again later."
                );
            }
        } finally {
            setLoading(false); // Ensure loading state is cleared regardless of success or error
        }
    };

    if (!userData) {
        return <>Loading...</>;
    }

    return (
        <div className="App">

            <Form onSubmit={handleSubmit}>
                <fieldset>
                    <h2>Profile Edit</h2>

                    <h5>Non-editable Information:</h5>
                    <p className='mb-2'><strong>User Id:</strong> {userData.id || "N/A"}</p>
                    <p className='mb-2'><strong>Username:</strong> {userData.username || "N/A"}</p>
                    <p className='mb-2'><strong>Account Name:</strong> {userData.name || "N/A"}</p>
                    <br></br>
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
                            value={formData.firstName}
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
                            value={formData.lastName}
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
                            value={formData.email}
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
                            value={formData.address1}
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
                            value={formData.address2}
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
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* State */}
                    <Form.Group className="mb-3" controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Postal Code */}
                    <Form.Group className="mb-3" controlId="formPostalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Postal Code"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Country */}
                    <Form.Group className="mb-3" controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Mobile Phone Number */}
                    <Form.Group className="mb-3" controlId="formMobilePhone">
                        <Form.Label>Mobile Phone Number</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Mobile Phone"
                            name="mobilePhone"
                            value={formData.mobilePhone}
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
                            value={formData.homePhone}
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
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Date of Birth */}
                    <Form.Group className="mb-3" controlId="formDateOfBirth">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter your date of birth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        Update Profile
                    </Button>
                </fieldset>
            </Form>
            <ToastStack ref={toastRef} />
        </div>
    );
};

export default ProfileEdit;