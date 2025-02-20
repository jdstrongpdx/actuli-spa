import React, {useEffect, useState} from "react";
import {Form, Button, Col} from "react-bootstrap";
import AppUser, {Education} from "../../../../interfaces/AppUser";
import {ApiRoutes} from "../../../../config/apiRoutes";
import {useTypes} from "../../../../contexts/TypesContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import SelectField from "../../form/SelectField";
import DateField from "../../form/DateField";
import TextField from "../../form/TextField";

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

    const deleteEducation = () => {
        // TODO complete this function
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
            navigate("/user?view=education");
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

                <Col className="mb-2">
                    <Button className="me-3" variant="primary" onClick={() => addNew()}>Add New</Button>
                    <Button variant="warning" onClick={() => deleteEducation()}>Delete</Button>
                </Col>

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

                    <TextField formLabel="School Name" fieldName="school" formik={formik} />
                    <SelectField
                        formLabel="Degree Type"
                        fieldName="degreeType"
                        list={typesData.educationDegreeList.data}
                        formik={formik}
                    />
                    <TextField formLabel="Degree Name" fieldName="degreeName" formik={formik} />
                    <TextField formLabel="City" fieldName="city" formik={formik} />
                    <SelectField
                        formLabel="State/Province"
                        fieldName="state"
                        list={typesData.states.data}
                        formik={formik}
                    />
                    <SelectField
                        formLabel="Country"
                        fieldName="country"
                        list={typesData.countries.data}
                        formik={formik}
                    />

                    <SelectField
                        formLabel="Degree Status"
                        fieldName="status"
                        list={typesData.educationStatusList.data}
                        formik={formik}
                    />

                    <DateField formLabel="Completion/Graduation Date" fieldName="completionDate" formik={formik} />

                    <TextField formLabel="Grade" fieldName="grade" formik={formik} />

                    <SelectField
                        formLabel="Grade Scale"
                        fieldName="gradeScale"
                        list={typesData.educationGradeScaleList.data}
                        formik={formik}
                    />

                    <TextField formLabel="Description" fieldName="description" formik={formik} />

                    <SelectField
                        formLabel="Importance to you personally or to your career"
                        fieldName="importance"
                        list={typesData.fiveLevelList.data}
                        formik={formik}
                    />

                    <Button type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Submitting..." : "Update Education"}
                    </Button>
                </fieldset>
            </Form>
        </div>
    );
};

export default EducationForm2;