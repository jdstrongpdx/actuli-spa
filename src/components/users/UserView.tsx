import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import IApplicationUser from "../../interfaces/IApplicationUser";

const UserView = ({ userData }: { userData: IApplicationUser }) => {

    if (!userData) {
        return <h3>Loading...</h3>;
    }
    return (
        <>
            <h1>Your Profile</h1>
            <div className="ml-3">
                <p className='mb-2'><strong>User Id:</strong> {userData.userId || ""}</p>
                <p className='mb-2'><strong>Username:</strong> {userData.username || ""}</p>
                <p className='mb-2'><strong>Name:</strong> {userData.name || ""}</p>
                <p className='mb-2'><strong>Email:</strong> {userData.email || ""}</p>
                <br/>
                <p className='mb-2'>
                    <strong>Name:</strong>
                    {userData.firstName || ""} {userData.lastName || ""}
                </p>
                <p className='mb-2'><strong>Address:</strong> {userData.address || ""}</p>
                <br/>
                <p className='mb-2'><strong>Phone Number:</strong> {userData.mobilePhone || userData.homePhone || ""}</p>
                <p className='mb-2'>
                    <strong>Website:</strong>
                    {userData.website
                        ? <a href={userData.website} target="_blank" rel="noopener noreferrer">{userData.website}</a>
                        : ""
                    }
                </p>
                <p className="mb-2">
                    <strong>Date of Birth:</strong>
                    {userData.dateOfBirth
                        ? new Date(userData.dateOfBirth).toLocaleDateString()
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
                <Link to="/user/edit">
                    <Button variant="primary">
                        Edit my Profile
                    </Button>
                </Link>
            </div>
        </>
    )
};

export default UserView;
