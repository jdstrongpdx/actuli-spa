import AppUser from "../../../../interfaces/AppUser";

const ContactView: React.FC<{userData: AppUser}> = ({userData}) => {
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
            </div>
        </>
    )
};

export default ContactView;
