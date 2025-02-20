import React, {useEffect, useState} from "react";
import { Form, Button } from "react-bootstrap";
import AppUser, {Education} from "../../../../interfaces/AppUser";
import {ApiRoutes} from "../../../../config/apiRoutes";
import {useTypes} from "../../../../contexts/TypesContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";

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
    const [educationList, setEducationList] = useState<Education[]>([])
    const [listIndex, setListIndex] = useState(0);
    const {typesData} = useTypes();
    const navigate = useNavigate();

    const ValidationSchema = () =>
        Yup.object().shape({
            school: Yup.string().required('School Name is required.'),
            degreeType: Yup.string().required('Degree Type is required.'),
            degreeName: Yup.string().required('Degree Name is required.'),
            city: Yup.string().optional().nullable(),
            state: Yup.string().optional().nullable(),
            country: Yup.string().optional().nullable(),
            location: Yup.string().optional().nullable(),
            status: Yup.string().required('Status is required.'),
            completionDate: Yup.date().optional().nullable(),
            grade: Yup.string().optional().nullable(),
            gradeScale: Yup.string().optional().nullable(),
            description: Yup.string().optional().nullable(),
            importance: Yup.string().optional().nullable(),
        });

    const formik = useFormik({
        initialValues,
        validationSchema: ValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                handleSubmit(values);
            } catch (error) {
                console.error("Error submitting form:", error);
            } finally {
                setSubmitting(false); // Ensure the button reactivates
            }
        },
    });

    useEffect(() => {
        if (userData && userData.profile.educationList.length > 0) {
            // data normalized in context
            setEducationList(userData.profile.educationList)
        }
    }, [])


    // TODO: sort the education in the context on load to change everywhere
    useEffect(() => {
        if (userData && userData.profile.educationList.length > 0) {
            setEducationList(userData.profile.educationList.sort(
                (a, b) => new Date(a.completionDate).getTime() - new Date(b.completionDate).getTime()))
        }
    }, []);

    const addNew = () => {
        setListIndex(educationList.length === 0 ? 0 : educationList.length);
        formik.setValues(initialValues);
    }

    useEffect(() => {
        if (userData && userData.profile.educationList.length > 0) {
            // data normalized in context
            formik.setValues(userData.profile.educationList[listIndex]);
        }
    }, [])

    const handleSubmit = async (values: Education) => {
        // Data is normalized in the context before submission
        await updateUser(ApiRoutes.UpdateUserEducationList, values as Partial<AppUser>);
        if (error){
            if (error.message) {
                throw new Error("Error Updating Contact: " + error.message);
            } else {
                throw new Error("An unknown error occurred.");
            }
        }
        else {
            toast.success("Education Updated Successfully");
            navigate("/user?tab=2");
        }
    };

    // LIST COMPONENT FOR RENDERING EDUCATION ITEMS
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

    // RENDER JSX CONTENT
    if (!userData || !typesData) {
        return <>Loading...</>;
    }

    return (
        <div className="App">
            <h2>Education Edit</h2>

            { displayList() }

            <Form noValidate onSubmit={formik.handleSubmit}>
                <fieldset>

                    {/*  School Name */}
                    <Form.Group className="mb-3" controlId="formSchoolName">
                        <Form.Label>School Name</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('school')}
                            isInvalid={Boolean(formik.touched.school && formik.errors.school)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.school}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Degree Type */}
                    <Form.Group className="mb-3" controlId="formDegreeType">
                        <Form.Label>Degree Type</Form.Label>
                        <Form.Control
                            as="select"
                            {...formik.getFieldProps('degreeType')}
                            isInvalid={Boolean(formik.touched.degreeType && formik.errors.degreeType)}
                        >
                            <option value="">Select a Degree Type</option>
                            {typesData.educationDegreeList.data.map((value, index) => (
                                <option key={index} value={value.id}>
                                    {value.value}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.degreeType}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/*  Degree Name */}
                    <Form.Group className="mb-3" controlId="formDegreeName">
                        <Form.Label>Degree Name</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('degreeName')}
                            isInvalid={Boolean(formik.touched.degreeName && formik.errors.degreeName)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.degreeName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* City */}
                    <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('city')}
                            isInvalid={Boolean(formik.touched.city && formik.errors.city)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.city}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* State */}
                    <Form.Group className="mb-3" controlId="formState">
                        <Form.Label>State/Province</Form.Label>
                        <Form.Control
                            as="select"
                            {...formik.getFieldProps('state')}
                            isInvalid={Boolean(formik.touched.state && formik.errors.state)}
                        >
                            <option value="">Select a State/Province</option>
                            {typesData.states.data.map((value, index) => (
                                <option key={index} value={value.id}>
                                    {value.value}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.state}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Country */}
                    <Form.Group className="mb-3" controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            as="select"
                            {...formik.getFieldProps('country')}
                            isInvalid={Boolean(formik.touched.country && formik.errors.country)}
                        >
                            <option value="">Select a Country</option>
                            {typesData.countries.data.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.value}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.country}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Status */}
                    <Form.Group className="mb-3" controlId="formStatus">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            as="select"
                            {...formik.getFieldProps('status')}
                            isInvalid={Boolean(formik.touched.status && formik.errors.status)}
                        >
                            <option value="">Select a Country</option>
                            {typesData.educationStatusList.data.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.value}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.status}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* TODO: Date is not parsing correctly on load */}
                    {/* Completion Date */}
                    <Form.Group className="mb-3" controlId="formCompletionDate">
                        <Form.Label>Completion/Graduation Date</Form.Label>
                        <Form.Control
                            type="date"
                            {...formik.getFieldProps('dateOfBirth')}
                            isInvalid={Boolean(formik.touched.completionDate && formik.errors.completionDate)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.completionDate}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Grade */}
                    <Form.Group className="mb-3" controlId="formGrade">
                        <Form.Label>Grade</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('grade')}
                            isInvalid={Boolean(formik.touched.grade && formik.errors.grade)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.grade}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Grade Scale */}
                    <Form.Group className="mb-3" controlId="formGradeScale">
                        <Form.Label>Grade Scale</Form.Label>
                        <Form.Control
                            as="select"
                            {...formik.getFieldProps('gradeScale')}
                            isInvalid={Boolean(formik.touched.gradeScale && formik.errors.gradeScale)}
                        >
                            <option value="">Select a Grade Scale</option>
                            {typesData.educationGradeScaleList.data.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.value}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.gradeScale}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('description')}
                            isInvalid={Boolean(formik.touched.description && formik.errors.description)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Importance to you personally or to your career */}
                    <Form.Group className="mb-3" controlId="formImportance">
                        <Form.Label>Importance to you personally or to your career</Form.Label>
                        <Form.Control
                            as="select"
                            {...formik.getFieldProps('importance')}
                            isInvalid={Boolean(formik.touched.importance && formik.errors.importance)}
                        >
                            <option value="">Select an Importance</option>
                            {typesData.fiveLevelList.data.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.value}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.importance}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Button type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Submitting..." : "Update Education"}
                    </Button>
                </fieldset>
            </Form>
        </div>
    );
};

export default EducationForm2;