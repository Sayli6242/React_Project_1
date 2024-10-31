import React from 'react'
import { useState } from 'react'
import { FaMapMarker } from 'react-icons/fa'

import { Link } from 'react-router-dom';
const JoblistSingular = ({ job }) => {
    const [showFullDescription, setShowFullDescription] = useState(false); //hook
    let description = job.description;
    if (!showFullDescription) {
        description = description.substring(0, 90) + '...';
    }
    return (
        <div className='bg-white rounded-xl shadow-md relative'>
            <div className='p-4'>
                <div className='mb-6'>
                    <div className='text-gray-600 my-2'>{job.job_type}</div>
                    <h3 className='text-3xl font-bold'>{job.title}</h3>

                </div>
                <div className='mb-5'>
                    {description}
                </div>
                <button onClick={() => setShowFullDescription((prevState) => !prevState)} className='text-indigo-500 mb-5 hover:text-indigo-600'>{showFullDescription ? 'Less' : 'More'}</button>
                <h3 className='text-indigo-500 mb-2'>{job.salary}</h3>
                <div className='border border-gray-100 mb-5'></div>
                <div className='flex flex-col lg:flex-row justify-between mb-4'>
                    <div className='text-orange-700 mb-3'>
                        <FaMapMarker className='inline text-lg mb-1 mr-14' />
                        {job.location}
                    </div>
                    <Link
                        to={`/jobs/${job._id}`}
                        className='inline-block bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-500'
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default JoblistSingular