
import {useUser} from "../contexts/UserContext";
import {Button, Col, Accordion} from "react-bootstrap";
import ContactView from "../components/users/Profile/Views/ContactView";
import { Link, useSearchParams } from "react-router-dom";
import EducationView from "../components/users/Profile/Views/EducationView";
import React from "react";


const UserProfile = () => {
    const { userData, error, userLoading, refreshUserData } = useUser();
    const [searchParams] = useSearchParams();

    // Get 'defaultTab' from the query string, default to "0" if not provided
    const defaultTab = searchParams.get("view") || "contact";

    // Define sectionMapping with section keys and components
    const sectionMapping: Record<string, React.FC<{ userData: any }>> = {
        contact: ContactView,
        education: EducationView,
    };

    const DynamicAccordion: React.FC<{ userData: any; sections: typeof sectionMapping }> = ({ userData, sections }) => {
        return (
            <Accordion defaultActiveKey="0">
                {Object.entries(sections).map(([type, SectionComponent], index) => {
                    const editLink = `/user/profile/edit?view=${type}`;

                    return (
                        <Accordion.Item eventKey={String(index)} key={type}>
                            <Accordion.Header>{`${type.charAt(0).toUpperCase()}${type.slice(1)} Information`}</Accordion.Header>
                            <Accordion.Body>
                                {/* Render the dynamic section */}
                                <SectionComponent userData={userData} />
                                {/* Provide an edit button */}
                                <Link to={editLink} >
                                    <Button className="mt-3" variant="primary">
                                        Edit {`${type.charAt(0).toUpperCase()}${type.slice(1)} Information`}
                                    </Button>
                                </Link>
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        );
    };

    if (userLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!userData || !userData.profile) {
        return <div>Loading User Profile...</div>;
    }

    return (
        <>
            <h1>Your Profile</h1>

            <Col>


            </Col>
            <div className="ml-3">
                <Accordion defaultActiveKey={defaultTab}>

                    {/* User Information */}
                    <Accordion.Item eventKey="information">
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

                    <DynamicAccordion userData={userData} sections={sectionMapping} />

                </Accordion>

                    <Button className="mt-3" variant="secondary" onClick={e => refreshUserData()}>
                    Refresh Profile Information
                </Button>
            </div>
        </>
        )
};

export default UserProfile;
