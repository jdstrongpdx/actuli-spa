import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { IApplicationUserForm } from "../../interfaces/IApplicationUser";
import { protectedResources } from "../../authConfig";
import useFetchWithMsal from "../../hooks/useFetchWithMsal";
import { useMsal } from "@azure/msal-react";
import { replaceNullWithEmptyString, replaceEmptyStringWithNull} from "../../utilities/NormalizationUtilities";

const initialValues: IApplicationUserForm = {
    userId: "", // UUID
    name: "",
    username: "",
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
    const navigate = useNavigate();
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const [userData, setUserData] = useState<IApplicationUserForm>(initialValues); // Form state
    const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.user.scopes.read,
    });



    // Fetch the user data on component load
    useEffect(() => {
        execute("GET", protectedResources.user.endpoint)
            .then((response) => {
                const processedData = replaceNullWithEmptyString(response); // Replace nulls
                setUserData((prevProfile) => ({
                    ...prevProfile,
                    ...processedData, // Merge processed data into form state
                }));
                if (activeAccount?.idTokenClaims) {
                    setUserData((prevProfile) => ({
                        ...prevProfile,
                        username: activeAccount.idTokenClaims.preferred_username || prevProfile.username,
                        name: activeAccount.idTokenClaims.name || prevProfile.name,
                    }));
                }
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
            });
    }, [execute]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        var normalizedData = replaceEmptyStringWithNull(userData);
        execute("PUT", protectedResources.user.endpoint, normalizedData).then((response) => {
        });
        // TODO alert user on success/error, redirect to user/view
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
                    <p className='mb-2'><strong>User Id:</strong> {userData.userId || "N/A"}</p>
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
                            value={userData.firstName}
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
                            value={userData.lastName}
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
                            value={userData.email}
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
                            value={userData.address1}
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
                            value={userData.address2}
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
                            value={userData.city}
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
                            value={userData.state}
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
                            value={userData.postalCode}
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
                            value={userData.country}
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
                            value={userData.mobilePhone}
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
                            value={userData.homePhone}
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
                            value={userData.website}
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
                            value={userData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Update Profile
                    </Button>
                </fieldset>
            </Form>
        </div>
    );
};

export default ProfileEdit;