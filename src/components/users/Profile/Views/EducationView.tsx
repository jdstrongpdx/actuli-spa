import AppUser from "../../../../interfaces/AppUser";

const EducationView: React.FC<{ userData: AppUser }> = ({ userData }) => {
    if (!userData.profile.educationList || userData.profile.educationList.length === 0) {
        return <h5>No Education Data Entered</h5>;
    }

    const educationList = userData.profile.educationList.map((edu, index) => (
        <div key={index} className={index !== userData.profile.educationList.length - 1 ? "mb-4" : ""}>
            {edu.school && <p className='mb-1'><strong>School: </strong> {edu.school}</p>}
            {edu.degreeType && <p className='mb-1'><strong>Degree Type: </strong> {edu.degreeType}</p>}
            {edu.location && <p className='mb-1'><strong>Location: </strong> {edu.location}</p>}
            {edu.status && <p className='mb-1'><strong>Status: </strong> {edu.status}</p>}
            {edu.completionDate && <p className='mb-1'><strong>Completion Date: </strong> {edu.completionDate}</p>}
            {edu.grade && <p className='mb-1'><strong>Grade: </strong> {edu.grade}</p>}
            {edu.gradeScale && <p className='mb-1'><strong>Grade Scale: </strong> {edu.gradeScale}</p>}
            {edu.description && <p className='mb-1'><strong>Description: </strong> {edu.description}</p>}
            {edu.importance && <p className='mb-1'><strong>Importance: </strong> {edu.importance}</p>}
        </div>
    ));

    return (
        <>
            {educationList}
        </>
    );
};

export default EducationView;