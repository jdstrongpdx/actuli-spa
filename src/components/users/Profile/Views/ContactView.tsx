import AppUser from "../../../../interfaces/AppUser";

const ContactView: React.FC<{userData: AppUser}> = ({userData}) => {
    if (!userData.profile.contact) {return <h5>Loading...</h5>}
    return (
        <>
            <div className="ml-3">
                <p className='mb-1'>
                    <strong>Name: </strong>
                    {userData.profile.contact.firstName || ""} {userData.profile.contact.lastName || ""}
                </p>
                <p className='mb-1'><strong>Address: </strong> {userData.profile.contact.address || ""}</p>
                <p className='mb-1'><strong>Email: </strong> {userData.profile.contact.email || ""}</p>
                <p className='mb-1'><strong>Mobile Phone Number: </strong> {userData.profile.contact.mobilePhone || ""}</p>
                <p className='mb-1'><strong>Home Phone Number: </strong> {userData.profile.contact.homePhone || ""}</p>

                <p className='mb-1'>
                    <strong>Website: </strong>
                    {userData.profile.contact.website
                        ? <a href={userData.profile.contact.website} target="_blank" rel="noopener noreferrer">{userData.profile.contact.website}</a>
                        : ""
                    }
                </p>
                <p className="mb-1">
                    <strong>Date of Birth: </strong>
                    {userData.profile.contact.dateOfBirth
                        ? new Date(userData.profile.contact.dateOfBirth).toLocaleDateString()
                        : ""
                    }
                </p>
                <p className='mb-1'><strong>Age: </strong> {userData.profile.contact.age || ""}</p>
            </div>
        </>
    )
};

export default ContactView;
