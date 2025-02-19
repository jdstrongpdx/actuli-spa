import React, {ChangeEvent, useEffect, useState} from "react";
import { Form, Button } from "react-bootstrap";
import {replaceEmptyStringWithNull} from "../../../../utilities/normalizationUtilities";
import AppUser, {Education} from "../../../../interfaces/AppUser";
import {ApiRoutes} from "../../../../config/apiRoutes";
import {useTypes} from "../../../../contexts/TypesContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

interface EducationForm2Props {
    userData: AppUser | null,
    error: Error | null,
    updateUser: (route: string, data: Partial<AppUser>) => Promise<void>,
}

const initialValues: Education = {
    school: "",
    degreeType: "",
    degreeName: "",
    city: "",
    state: "",
    country: "",
    location: "",
    status: "",
    completionDate: "",
    grade: "",
    gradeScale: "",
    description: "",
    importance: "",
};

const EducationForm2: React.FC<EducationForm2Props> = ({ userData, error, updateUser }) => {
    const [formData, setFormData] = useState<Education>(initialValues);
    const [educationList, setEducationList] = useState<Education[]>([])
    const [listIndex, setListIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const {typesData} = useTypes();
    const navigate = useNavigate();

    // TODO: sort the education in the context on load to change everywhere
    useEffect(() => {
        if (userData && userData.profile.educationList.length > 0) {
            setEducationList(userData.profile.educationList.sort(
                (a, b) => new Date(a.completionDate).getTime() - new Date(b.completionDate).getTime()))
        }
    }, []);

    const addNew = () => {
        setListIndex(educationList.length === 0 ? 0 : educationList.length);
        setFormData(initialValues);
    }

    const displayList = () => {
        if (!educationList) {
            return (
            <>
                <p>No records found.</p>
                <Button variant="primary" onClick={() => addNew()}>Add New</Button>
            </>
        )}
        return (
            <>
                <p>Select from the following list to edit a record or select new to add a new one.</p>

                <ol>
                    {educationList.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => setListIndex(index)}
                            style={{ cursor: "pointer", marginBottom: "10px" }}
                        >
                            <strong>{item.degreeType}</strong> at <strong>{item.school}</strong> - {new Date(item.completionDate).toLocaleDateString()}
                        </li>
                    ))}
                </ol>


                <Button variant="primary" onClick={() => addNew()}>Add New</Button>
            </>
        )
    }

    useEffect(() => {
        if (userData && userData.profile.educationList.length > 0) {
            // data normalized in context
            setFormData(userData.profile.educationList[listIndex]);
        }
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevProfile: Education) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Normalize and prepare the data for submission
            const normalizedData: any = replaceEmptyStringWithNull(formData);

            // TODO: Need to test updating records (adding new works)
            // Append a new record to the education list or replace the record in the existing list
            if (listIndex > educationList.length - 1) {
                educationList.push(normalizedData);
            }
            else
            {
                educationList[listIndex] = normalizedData;
            }

            // Update the AppUser record
            await updateUser(ApiRoutes.UpdateUserEducationList, educationList);
            toast.success("Education Updated Successfully");
            navigate("/user?tab=2");

            // TODO: errors are not being blocked/handled
        } catch (error) {
            if (error instanceof Error) {
                toast.error("Error Updating Education List: " + error);
            } else {
                toast.error("An unknown error occurred.")
            }
        } finally {
            setLoading(false);
        }
    };

    if (!userData || !typesData) {
        return <>Loading...</>;
    }


    return (
        <div className="App">
            <h2>Education Edit</h2>

            { displayList() }

            <Form onSubmit={handleSubmit}>
                <fieldset>

                    {/*  School Name */}
                    <Form.Group className="mb-3" controlId="formSchool">
                        <Form.Label>
                            School Name <sup>*</sup>
                        </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="School name"
                            name="school"
                            value={formData?.school || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Degree Type */}
                    <Form.Group className="mb-3" controlId="formDegreeType">
                        <Form.Label>Degree Type <sup>*</sup></Form.Label>
                        <Form.Select
                            name="degreeType"
                            required
                            value={formData?.degreeType || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select a Degree</option>
                            {typesData.educationDegreeList.data.map((degree) => (
                                <option key={degree.id} value={degree.value}>
                                    {degree.value}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/*  Degree Name */}
                    <Form.Group className="mb-3" controlId="formDegreeName">
                        <Form.Label>
                            Degree Name (Name of Major, Minor, Certification, etc) <sup>*</sup>
                        </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Degree name"
                            name="degreeName"
                            value={formData?.degreeName || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* City */}
                    <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="City"
                            name="city"
                            value={formData?.city || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    {/* State */}
                    <Form.Group className="mb-3" controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Select
                            name="state"
                            value={formData?.state || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select a State</option>
                            {typesData.states.data.map((state) => (
                                <option key={state.id} value={state.value}>
                                    {state.value}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Country */}
                    <Form.Group className="mb-3" controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Select
                            name="country"
                            value={formData?.country || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select an Country</option>
                            {typesData.countries.data.map((country) => (
                                <option key={country.id} value={country.value}>
                                    {country.value}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Status */}
                    <Form.Group className="mb-3" controlId="formStatus">
                        <Form.Label>Status <sup>*</sup></Form.Label>
                        <Form.Select
                            name="status"
                            required
                            value={formData?.status || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select a Status</option>
                            {typesData.educationStatusList.data.map((status) => (
                                <option key={status.id} value={status.value}>
                                    {status.value}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Completion Date */}
                    <Form.Group className="mb-3" controlId="formCompletionDate">
                        <Form.Label>Completion Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="completionDate"
                            value={formData?.completionDate || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Grade */}
                    <Form.Group className="mb-3" controlId="formGrade">
                        <Form.Label>Grade</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Grade"
                            name="grade"
                            value={formData?.grade || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Grade Scale */}
                    <Form.Group className="mb-3" controlId="formGradeScale">
                        <Form.Label>Grade Scale</Form.Label>
                        <Form.Select
                            name="gradeScale"
                            value={formData?.gradeScale || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select a Status</option>
                            {typesData.educationGradeScaleList.data.map((gradeScale) => (
                                <option key={gradeScale.id} value={gradeScale.value}>
                                    {gradeScale.value}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Description"
                            name="description"
                            value={formData?.description || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Importance to you personally or to your career */}
                    <Form.Group className="mb-3" controlId="formImportance">
                        <Form.Label>Importance</Form.Label>
                        <Form.Select
                            name="importance"
                            value={formData?.importance || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select an Importance</option>
                            {typesData.fiveLevelList.data.map((level) => (
                                <option key={level.id} value={level.value}>
                                    {level.value}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>


                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        Update Education
                    </Button>
                </fieldset>
            </Form>
        </div>
    );
};

export default EducationForm2;