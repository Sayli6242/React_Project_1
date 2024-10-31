import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const JobFilterPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        location: '',
        jobType: '',
        jobTitle: '',
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const initialFilters = {
            location: searchParams.get('location') || '',
            jobType: searchParams.get('job_type') || '',
            jobTitle: searchParams.get('title') || '',
        };
        setFilters(initialFilters);
        fetchJobs(initialFilters);
    }, [location]);

    const fetchJobs = async (currentFilters) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams(currentFilters).toString();
            const response = await fetch(`/api/jobs/filter?${queryParams}`);
            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }
            const data = await response.json();
            setJobs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(filters).toString();
        navigate(`/jobs/filter?${queryParams}`);
        fetchJobs(filters);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Filter Jobs</h1>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        name="location"
                        value={filters.location}
                        onChange={handleFilterChange}
                        placeholder="Location"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="jobType"
                        value={filters.jobType}
                        onChange={handleFilterChange}
                        placeholder="Job Type"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="jobTitle"
                        value={filters.jobTitle}
                        onChange={handleFilterChange}
                        placeholder="Job Title"
                        className="border p-2 rounded"
                    />
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Apply Filters
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map(job => (
                    <div key={job._id} className="border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        <p>{job.location}</p>
                        <p>{job.jobType}</p>
                    </div>
                ))}
            </div>

            {jobs.length === 0 && !loading && <p>No jobs found matching your criteria.</p>}
        </div>
    );
};

export default JobFilterPage;