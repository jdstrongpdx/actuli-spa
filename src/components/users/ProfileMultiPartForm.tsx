import React, { useState } from "react";

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

const ProfileMultiPartForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [progress, setProgress] = useState(60);

    const handleNext = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleStepChange = (page: number) => {
        setCurrentStep((page));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <ContactForm1/>;
            case 2:
                return <EducationForm2/>;
            case 3:
                return <WorkForm3/>;
            case 4:
                return <RelationshipForm4/>;
            case 5:
                return <IdentityForm5/>;
            case 6:
                return <ReligionForm6/>;
            case 7:
                return <TravelForm7/>;
            case 8:
                return <HealthForm8/>;
            case 9:
                return <ActivitiesForm9/>;
            case 10:
                return <GivingForm10/>;
            case 11:
                return <FinancesForm11/>;
            default:
                return <h2>Form Completed</h2>;
        }
    };

    return (
        <div>

            {/* Display the progress bar */}
            <p>Profile Progress Bar</p>
            <ProgressBar className="mb-3" now={progress} label={`${progress}%`} />

            {/* Render the correct form */}
            {renderStep()}

            {/* Button group for the form steps */}
            <ButtonGroup className="mt-3">
                <Button onClick={handleBack} disabled={currentStep === 1}>Back</Button>
                {[
                    { step: 1, label: 'Contact' },
                    { step: 2, label: 'Education' },
                    { step: 3, label: 'Work' },
                    { step: 4, label: 'Relationship' },
                    { step: 5, label: 'Identity' },
                    { step: 6, label: 'Religion' },
                    { step: 7, label: 'Travel' },
                    { step: 8, label: 'Health' },
                    { step: 9, label: 'Activities' },
                    { step: 10, label: 'Giving' },
                    { step: 11, label: 'Finances' },
                ].map(({ step, label }) => (
                    <Button
                        key={step}
                        variant={currentStep === step ? 'success' : 'secondary'}
                        onClick={() => handleStepChange(step)}
                    >
                        {label}
                    </Button>
                ))}


                <Button onClick={handleNext} disabled={currentStep === 11}>Next</Button>
            </ButtonGroup>
        </div>
    );
};

export default ProfileMultiPartForm;