import {ChangeEvent, useState} from "react";
import { Form, Button } from "react-bootstrap";
import {statesList} from "../../data/statesList.ts";
import {IUserProfile} from "../../interfaces/IUser.ts";

interface IUserForm {
    "id": string,
    "email": string,
    "mobilePhoneNumber": string,
    "website": string,
    "aboutMe": string,
    "firstName": string,
    "lastName": string,
    "street": string,
    "city": string,
    "state": string,
    "postalCode": string,
    "country": string,
    "dateOfBirth": Date | string
}

const initialValues: IUserForm = {
    "id": '',
    "email": '',
    "mobilePhoneNumber": '',
    "website": '',
    "aboutMe": '',
    "firstName": '',
    "lastName": '',
    "street": '',
    "city": '',
    "state": '',
    "postalCode": '',
    "country": '',
    "dateOfBirth": ''
}

const ProfileEdit = () => {
    const [userProfile, setUserProfile] = useState(initialValues);

    // TODO form validation
    const getIsFormValid = () => {
        return true;
    }

    const clearForm = () => {
        setUserProfile(initialValues);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const updatedProfile = convertProfileOnSubmit(userProfile);
        // TODO update user data
        alert("Account created!");
        clearForm();
    };

    function convertProfileOnSubmit(formValues: IUserForm): IUserProfile {
        const { address1, address2, city, state, postalCode, country, dateOfBirth, ...rest } = formValues;

        return {
            ...rest, // Spread all other properties directly
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date(), // Convert dateOfBirth
            address: {
                address1,
                address2,
                city,
                state,
                postalCode,
                country,
            },
        };
    }

    return (
        <div className="App">
            <Form onSubmit={handleSubmit}>
                <fieldset>
                    <h2>Profile Edit</h2>

                    {/* First Name */}
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>
                            First name <sup>*</sup>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            value={userProfile.firstName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Last Name */}
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>
                            Last name <sup>*</sup>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                            value={userProfile.lastName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Avatar */}
                    <Form.Group className="mb-3" controlId="formAvatar">
                        <Form.Label>Avatar URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Avatar URL"
                            name="avatar"
                            value={userProfile.avatar}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Bio */}
                    <Form.Group className="mb-3" controlId="formBio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Tell us about yourself..."
                            name="bio"
                            value={userProfile.bio}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Mobile Number */}
                    <Form.Group className="mb-3" controlId="formMobileNumber">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Mobile Number"
                            name="mobileNumber"
                            value={userProfile.mobileNumber}
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
                            value={userProfile.website}
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
                            value={userProfile.dateOfBirth}
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
                            value={userProfile.address1}
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
                            value={userProfile.address2}
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
                            value={userProfile.city}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* State */}
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="formState">Select a State:</Form.Label>
                        <Form.Select
                            id="formState"
                            name="state"
                            value={userProfile.state}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                -- Select a State --
                            </option>
                            {Object.entries(statesList).map(([key, state]) => (
                                <option key={key} value={state.stateAbbreviation}>
                                    {state.stateName}
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
                            value={userProfile.postalCode}
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
                            value={userProfile.country}
                            onChange={handleChange}
                        />
                    </Form.Group>



                    <Button
                        type="submit"
                        variant="primary"
                        disabled={!getIsFormValid()}
                    >
                        Update Profile
                    </Button>
                </fieldset>
            </Form>
        </div>
    );
};

export default ProfileEdit;