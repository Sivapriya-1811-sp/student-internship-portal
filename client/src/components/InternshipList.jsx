
import { Link } from 'react-router-dom';
import internships from '../data/internships';
import ApplicationForm from './ApplicationForm';

function InternshipList() {

    return (
        <div className="container">

            {/* Hero Section */}
            <section className="hero">

                <h1>Find Your Perfect Internship</h1>

                <p>
                    Explore exciting opportunities and start building
                    your professional career.
                </p>

            </section>


            {/* Available Internships */}
            <section className="internship-section">

                <h2>Available Internships</h2>

                <div className="internship-grid">

                    {internships.map((internship) => (

                        <div
                            className="internship-card"
                            key={internship.id}
                        >

                            <span className="location">
                                {internship.location}
                            </span>

                            <h3>{internship.title}</h3>

                            <p>
                                <strong>Company:</strong>{' '}
                                {internship.company}
                            </p>

                            <p>
                                <strong>Duration:</strong>{' '}
                                {internship.duration}
                            </p>

                            <p>
                                {internship.description}
                            </p>

                            <Link
                                to={`/internships/${internship.id}`}
                                className="details-btn"
                            >
                                View Details
                            </Link>

                        </div>

                    ))}

                </div>

            </section>


            {/* Student Application Form */}
            <ApplicationForm />

        </div>
    );
}

export default InternshipList;
