
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import internships from '../data/internships';

function ApplicationForm() {

    const [searchParams] = useSearchParams();

    const initialInternship = searchParams.get('internship') || '';

    const [formData, setFormData] = useState({
        studentName: '',
        email: '',
        rollNumber: '',
        internship: initialInternship
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        setMessage('');
        setMessageType('');

        if (
            !formData.studentName.trim() ||
            !formData.email.trim() ||
            !formData.rollNumber.trim() ||
            !formData.internship
        ) {
            setMessage('Please fill in all fields.');
            setMessageType('error');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(formData.email)) {
            setMessage('Please enter a valid email address.');
            setMessageType('error');
            return;
        }

        if (formData.studentName.trim().length < 2) {
            setMessage('Student name must contain at least 2 characters.');
            setMessageType('error');
            return;
        }

        setLoading(true);

        try {

           const apiUrl = import.meta.env.VITE_API_URL || '';

const response = await fetch(
    `${apiUrl}/api/applications`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...formData,
                        studentName: formData.studentName.trim(),
                        email: formData.email.trim(),
                        rollNumber: formData.rollNumber.trim()
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || 'Application submission failed.'
                );
            }

            setMessage(
                'Congratulations! Your application was submitted successfully.'
            );

            setMessageType('success');

            setFormData({
                studentName: '',
                email: '',
                rollNumber: '',
                internship: ''
            });

        } catch (error) {

            setMessage(
                error.message || 'Something went wrong. Please try again.'
            );

            setMessageType('error');

        } finally {
            setLoading(false);
        }
    }

    return (

        <section className="application-section" id="apply">

            <h2>Apply for an Internship</h2>

            <p className="form-description">
                Fill in your details to apply for your preferred internship.
            </p>

            <form className="application-form" onSubmit={handleSubmit}>

                <label>Student Name</label>

                <input
                    type="text"
                    name="studentName"
                    placeholder="Enter your full name"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    minLength="2"
                />

                <label>Email ID</label>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Roll Number</label>

                <input
                    type="text"
                    name="rollNumber"
                    placeholder="Enter your roll number"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    required
                />

                <label>Select Internship</label>

                <select
                    name="internship"
                    value={formData.internship}
                    onChange={handleChange}
                    required
                >

                    <option value="">Choose an internship</option>

                    {internships.map((item) => (
                        <option key={item.id} value={item.title}>
                            {item.title}
                        </option>
                    ))}

                </select>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Application'}
                </button>

                {message && (
                    <p className={`form-message ${messageType}`}>
                        {message}
                    </p>
                )}

            </form>

        </section>
    );
}

export default ApplicationForm;
