import IAppUser from "../../interfaces/AppUser";
import ContactView from "./Profile/ContactView";

const UserView = ({ userData }: { userData?: IAppUser }) => {

    if (!userData) {
        return <h3>Loading...</h3>;
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

                <ContactView userData={userData} />
            </div>
        </>
    )
};

export default UserView;
