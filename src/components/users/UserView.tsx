import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import { useEffect, useState } from 'react';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { loginRequest, protectedResources } from "../../authConfig.ts"

const UserView = ({userData}) => {

    // Show a loading indicator while profile data is being fetched
    if (!userData) {
        return <h3>Loading...</h3>;
    }
    return (
        <>
            <h1>Your Profile</h1>
            <div className="ml-3">
                <p className='mb-2'><strong>username:</strong> {userData.username || ""}</p>
                <p className='mb-2'><strong>Email:</strong> {userData.email || ""}</p>
                <br/>
                <p className='mb-2'><strong>Name:</strong> {userData.profile.firstName} {userData.profile.lastName}</p>
                <p className='mb-2'>
                    <strong>Address:</strong> {userData.profile.address.address1 || ""} {userData.profile.address.address2 ? userData.profile.address.address2 || "" : ""}
                </p>
                <p className='mb-2'><strong>City:</strong> {userData.profile.address.city || ""}</p>
                <p className='mb-2'>
                    <strong>State/Province/Region:</strong> {userData.profile.address.state ? userData.profile.address.state || "" : ""}
                </p>
                <p className='mb-2'><strong>Postal Code:</strong> {userData.profile.address.postalCode || ""}</p>
                <p className='mb-2'>
                    <strong>Country:</strong> {userData.profile.address.country ? userData.profile.address.country || "" : ""}
                </p>
                <br/>
                <p className='mb-2'><strong>Phone Number:</strong> {userData.profile.mobileNumber || ""}</p>
                <p className='mb-2'><strong>Website:</strong> <a
                    href={userData.profile.website || ""}>{userData.profile.website || ""}</a></p>
                <p className="mb-2">
                    <strong>Date of Birth:</strong> {userData.profile.dateOfBirth.toLocaleDateString() || "N/A"}
                </p>
                <p className="mt-0 mb-0 text-muted font-italic">
                    Created on {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "None"}</p>
                <p className="mt-0 mb-0 text-muted font-italic">
                    Updated
                    on {userData.updatedAt ? new Date(userData.updatedAt).toLocaleDateString() : "None"}</p>
                <Link to="/profileEdit">
                    <Button variant="primary">
                        Edit my Profile
                    </Button>
                </Link>
            </div>
        </>
    )
};

export default UserView;
