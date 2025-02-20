import React, {useEffect, useState} from "react";

import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ContactForm1 from "./Profile/Forms/ContactForm1";
import EducationForm2 from "./Profile/Forms/EducationForm2";
import WorkForm3 from "./Profile/Forms/WorkForm3";
import RelationshipForm4 from "./Profile/Forms/RelationshipForm4";
import IdentityForm5 from "./Profile/Forms/IdentityForm5";
import ReligionForm6 from "./Profile/Forms/ReligionForm6";
import TravelForm7 from "./Profile/Forms/TravelForm7";
import HealthForm8 from "./Profile/Forms/HealthForm8";
import ActivitiesForm9 from "./Profile/Forms/ActivitiesForm9";
import GivingForm10 from "./Profile/Forms/GivingForm10";
import FinancesForm11 from "./Profile/Forms/FinancesForm11";
import {useUser} from "../../contexts/UserContext";
import {useSearchParams} from "react-router-dom";

const ProfileEditForm: React.FC = () => {
    const { userData, error, userLoading, updateUser } = useUser(); // note: can access refreshUserData function from context
    const [currentStep, setCurrentStep] = useState<string>("contact");
    const [progress, setProgress] = useState(60);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        setCurrentStep(searchParams.get("view") || "contact");
    }, [searchParams]);

    const handleStepChange = (view: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set("view", view);
        window.history.replaceState(null, "", url.toString());

        setCurrentStep((view));
    };

    const renderStep = () => {
        switch (currentStep) {
            case "contact":
                return <ContactForm1 userData={userData} error={error} updateUser={updateUser}/>;
            case "education":
                return <EducationForm2 userData={userData} error={error} updateUser={updateUser}/>;
            case "work":
                return <WorkForm3/>;
            case "relationship":
                return <RelationshipForm4/>;
            case "identity":
                return <IdentityForm5/>;
            case "religion":
                return <ReligionForm6/>;
            case "travel":
                return <TravelForm7/>;
            case "health":
                return <HealthForm8/>;
            case "activities":
                return <ActivitiesForm9/>;
            case "giving":
                return <GivingForm10/>;
            case "finances":
                return <FinancesForm11/>;
            default:
                return <h2>Form Completed</h2>;
        }
    };

    if (userLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!userData) {
        return <div>Loading User Profile...</div>;
    }

    return (
        <div>

            {/* Display the progress bar */}
            <p>Profile Progress Bar</p>
            <ProgressBar className="mb-3" now={progress} label={`${progress}%`} />

            {/* Button group for the form steps */}
            <ButtonGroup className="mb-3">
                {[
                    { step: "contact", label: 'Contact' },
                    { step: "education", label: 'Education' },
                    { step: "work", label: 'Work' },
                    { step: "relationship", label: 'Relationship' },
                    { step: "identity", label: 'Identity' },
                    { step: "religion", label: 'Religion' },
                    { step: "travel", label: 'Travel' },
                    { step: "health", label: 'Health' },
                    { step: "activities", label: 'Activities' },
                    { step: "giving", label: 'Giving' },
                    { step: "finances", label: 'Finances' },
                ].map(({ step, label }) => (
                    <Button
                        key={step}
                        variant={currentStep === step ? 'success' : 'secondary'}
                        onClick={() => handleStepChange(step)}
                    >
                        {label}
                    </Button>
                ))}
            </ButtonGroup>

            {/* Render the correct form */}
            {renderStep()}


        </div>
    );
};

export default ProfileEditForm;