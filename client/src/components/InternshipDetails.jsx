
import { Link, useParams } from 'react-router-dom';
import internships from '../data/internships';

function InternshipDetails() {

    const { id } = useParams();

    const internship = internships.find(
        (item) => item.id === id
    );

    if (!internship) {
        return (
            <div className="container">
                <h2>Internship Not Found</h2>
                <Link to="/">Back to Internships</Link>
            </div>
        );
    }

    return (
        <div className="container">

            <div className="details-card">

                <span className="location">
                    {internship.location}
                </span>

                <h1>{internship.title}</h1>

                <h3>{internship.company}</h3>

                <p>
                    <strong>Duration:</strong> {internship.duration}
                </p>

                <p>
                    <strong>Description:</strong>
                    {internship.description}
                </p>

                <h3>Required Skills</h3>

                <div className="skills">
                    {internship.skills.map((skill, index) => (
                        <span key={index} className="skill">
                            {skill}
                        </span>
                    ))}
                </div>

                <Link
                    to={`/?internship=${internship.id}#apply`}
                    className="details-btn"
                >
                    Apply for this Internship
                </Link>

                <br /><br />

                <Link to="/" className="back-link">
                    ← Back to Internships
                </Link>

            </div>

        </div>
    );
}

export default InternshipDetails;
