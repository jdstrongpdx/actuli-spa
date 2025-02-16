import IAppUser from "../../interfaces/AppUser";
import ContactView from "./Profile/Views/ContactView";
import Accordion from 'react-bootstrap/Accordion';

const ProfileView = ({ userData }: { userData?: IAppUser }) => {

    if (!userData) {
        return <h3>Loading...</h3>;
    }
    return (
        <>
            <h1>Your Profile</h1>
            <div className="ml-3">
                <Accordion defaultActiveKey="0">

                    {/* User Information */}
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>User Information</Accordion.Header>
                        <Accordion.Body>
                            <p className='mb-2'><strong>User Id:</strong> {userData.id || "N/A"}</p>
                            <p className='mb-2'><strong>Username:</strong> {userData.username || "N/A"}</p>
                            <p className='mb-2'><strong>Account Name:</strong> {userData.name || "N/A"}</p>
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
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Contact Information */}
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Contact Information</Accordion.Header>
                        <Accordion.Body>
                            <ContactView userData={userData} />
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Education Information */}
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Education Information</Accordion.Header>
                        <Accordion.Body>
                            <p>Education Information</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Work Information */}
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Work Information</Accordion.Header>
                        <Accordion.Body>
                            <p>Work Information</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Relationship Information */}
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Relationship Information</Accordion.Header>
                        <Accordion.Body>
                            <p>Relationship Information</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Identity Information */}
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>Identity Information</Accordion.Header>
                        <Accordion.Body>
                            <p>Identity Information</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Religion Information */}
                    <Accordion.Item eventKey="6">
                        <Accordion.Header>Religion Information</Accordion.Header>
                        <Accordion.Body>
                            <p>Religion Information</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Travel Information */}
                    <Accordion.Item eventKey="7">
                        <Accordion.Header>Travel Information</Accordion.Header>
                        <Accordion.Body>
                            <p>Travel Information</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Health Information */}
                    <Accordion.Item eventKey="8">
                        <Accordion.Header>Health Information</Accordion.Header>
                        <Accordion.Body>
                            <p>Health Information</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Activities Information */}
                    <Accordion.Item eventKey="9">
                        <Accordion.Header>Activities Information</Accordion.Header>
                        <Accordion.Body>
                            <p>Activities Information</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Giving Information */}
                    <Accordion.Item eventKey="10">
                        <Accordion.Header>Giving Information</Accordion.Header>
                        <Accordion.Body>
                            <p>Giving Information</p>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Finances Information */}
                    <Accordion.Item eventKey="11">
                        <Accordion.Header>Finances Information</Accordion.Header>
                        <Accordion.Body>
                            <p>Finances Information</p>
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>
            </div>
        </>
    )
};

export default ProfileView;
