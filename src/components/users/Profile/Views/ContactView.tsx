import AppUser from "../../../../interfaces/AppUser";

const ContactView: React.FC<{userData: AppUser}> = ({userData}) => {
    return (
        <>
            <div className="ml-3">
                <p className='mb-2'>
                    <strong>Name: </strong>
                    {userData.profile.contact.firstName || ""} {userData.profile.contact.lastName || ""}
                </p>
                <p className='mb-2'><strong>Address: </strong> {userData.profile.contact.address || ""}</p>
                <p className='mb-2'><strong>Email: </strong> {userData.profile.contact.email || ""}</p>
                <p className='mb-2'><strong>Mobile Phone Number: </strong> {userData.profile.contact.mobilePhone || ""}</p>
                <p className='mb-2'><strong>Home Phone Number: </strong> {userData.profile.contact.homePhone || ""}</p>

                <p className='mb-2'>
                    <strong>Website: </strong>
                    {userData.profile.contact.website
                        ? <a href={userData.profile.contact.website} target="_blank" rel="noopener noreferrer">{userData.profile.contact.website}</a>
                        : ""
                    }
                </p>
                <p className="mb-2">
                    <strong>Date of Birth: </strong>
                    {userData.profile.contact.dateOfBirth
                        ? new Date(userData.profile.contact.dateOfBirth).toLocaleDateString()
                        : ""
                    }
                </p>
                <p className='mb-2'><strong>Age: </strong> {userData.profile.contact.age || ""}</p>
            </div>
        </>
    )
};

export default ContactView;
