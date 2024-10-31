import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10); // adjust this value as needed


    const [locations, setLocations] = useState([]);
    const [jobTypes, setJobTypes] = useState([]);
    const [titles, setTitles] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedJobType, setSelectedJobType] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const apiUrl = isHome ? '/api/jobs?limit=3' : `/api/jobs?skip=${skip}`;
            try {
                const res = await fetch(apiUrl);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setJobs(data);

                const uniqueLocations = [...new Set(data.map(job => job.location))];
                setLocations(uniqueLocations);
                const uniqueJobTypes = [...new Set(data.map(job => job.job_type))];
                setJobTypes(uniqueJobTypes);
                const uniqueTitles = [...new Set(data.map(job => job.title))];
                setTitles(uniqueTitles);

            } catch (error) {
                console.log('Error fetching data:', error);
            } finally {
                setLoading(false);
            }

        };

        fetchJobs();
    }, [isHome, skip, limit]);


    const handleFilter = () => {
        const filteredJobs = jobs.filter((job) => {
            return (
                (selectedLocation === '' || job.location === selectedLocation) &&
                (selectedJobType === '' || job.job_type === selectedJobType) &&
                (selectedTitle === '' || job.title === selectedTitle)
            );
        });
        setFilteredJobs(filteredJobs);
    };

    const handleNextPage = () => {

        setSkip(skip + limit);

    };

    const handlePreviousPage = () => {
        if (skip > 0) {
            setSkip(skip - limit);
        }
    };




    return (
        <section className='bg-blue-50 px-4 py-10'>
            <div className='container-xl lg:container m-auto'>
                <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
                    {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                </h2>

                {loading ? (
                    <Spinner loading={loading} />
                ) : (
                    <div>
                        {!isHome && (
                            <div className="mb-6">
                                <h3>Filter Jobs</h3>
                                <label>
                                    Location:
                                    <select
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                    >
                                        <option value="">All</option>
                                        {locations.map((location) => (
                                            <option key={location} value={location}>
                                                {location}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label>
                                    Job Type:
                                    <select
                                        value={selectedJobType}
                                        onChange={(e) => setSelectedJobType(e.target.value)}
                                    >
                                        <option value="">All</option>
                                        {jobTypes.map((job_type) => (
                                            <option key={job_type} value={job_type}>
                                                {job_type}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label>
                                    Title:
                                    <select
                                        value={selectedTitle}
                                        onChange={(e) => setSelectedTitle(e.target.value)}
                                    >
                                        <option value="">All</option>
                                        {titles.map((title) => (
                                            <option key={title} value={title}>
                                                {title}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <button onClick={handleFilter} >Filter</button>
                            </div>
                        )}

                        {/* Job Listings */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {(filteredJobs.length > 0 ? filteredJobs : jobs).map((job) => (
                                <JobListing key={job._id} job={job} />
                            ))}
                        </div>

                        {!isHome && (
                            <div className='flex justify-between mt-6'>
                                <button
                                    onClick={handlePreviousPage}
                                    className='bg-indigo-700 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    className='bg-indigo-700 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                                >
                                    Next
                                </button>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </section>
    );
};

export default JobListings;