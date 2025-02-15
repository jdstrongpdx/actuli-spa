import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useUser} from "../../../contexts/UserContext";

const ContactView = () => {
    const { userData, error, userLoading } = useUser();

    if (userLoading) {
        return <h3>Loading...</h3>;
    }
    else if (error) {
        return <h3>Error: {error.message}</h3>;
    }
    else if (!userData) {
        return <h3>Error retrieving user data.</h3>;
    }
    return (
        <>
            <h1>Your Profile</h1>
            <div className="ml-3">
                <h5>Non-editable Information:</h5>
                <p className='mb-2'><strong>User Id:</strong> {userData.id || "N/A"}</p>
                <p className='mb-2'><strong>Username:</strong> {userData.username || "N/A"}</p>
                <p className='mb-2'><strong>Account Name:</strong> {userData.name || "N/A"}</p>
                <br></br>

                <p className='mb-2'><strong>Email:</strong> {userData.profile.contact.email || ""}</p>
                <br/>
                <p className='mb-2'>
                    <strong>Name:</strong>
                    {userData.profile.contact.firstName || ""} {userData.profile.contact.lastName || ""}
                </p>
                <p className='mb-2'><strong>Address:</strong> {userData.profile.contact.address || ""}</p>
                <br/>
                <p className='mb-2'><strong>Phone Number:</strong> {userData.profile.contact.mobilePhone || userData.profile.contact.homePhone || ""}</p>
                <p className='mb-2'>
                    <strong>Website:</strong>
                    {userData.profile.contact.website
                        ? <a href={userData.profile.contact.website} target="_blank" rel="noopener noreferrer">{userData.profile.contact.website}</a>
                        : ""
                    }
                </p>
                <p className="mb-2">
                    <strong>Date of Birth:</strong>
                    {userData.profile.contact.dateOfBirth
                        ? new Date(userData.profile.contact.dateOfBirth).toLocaleDateString()
                        : ""
                    }
                </p>
                <p className="mt-0 mb-0 text-muted font-italic">
                    Created on:
                    {userData.createdAt
                        ? new Date(userData.createdAt).toLocaleDateString()
                        : "None"
                    }
                </p>
                <p className="mt-0 mb-0 text-muted font-italic">
                    Updated on:
                    {userData.modifiedAt
                        ? new Date(userData.modifiedAt).toLocaleDateString()
                        : "None"
                    }
                </p>
                <br></br>
                <Link to="/user/profile/contact/edit">
                    <Button variant="primary">
                        Edit my Profile
                    </Button>
                </Link>
            </div>
        </>
    )
};

export default ContactView;
