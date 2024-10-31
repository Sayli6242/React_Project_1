import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
// import JobFilterPage from './pages/JobFilterPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });

    if (!res.ok) {
      throw new Error('Failed to add job');
    }

    return await res.json(); // Return the added job data
  };

  // Fetch a single job
  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    console.log('Deleting job with id:', id); // Add this line
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`Failed to delete job. Status: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  };

  // Update Job
  const updatedJob = async (id, job) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
      if (!res.ok) {
        throw new Error(`Failed to update job. Status: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  };


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path='/jobs'
          element={<JobsPage />}
          loader={fetchJobs}
        />
        <Route
          path='/add-job'
          element={<AddJobPage addJobSubmit={addJob} />}
        />

        <Route
          path='/edit-job/:_id'
          element={<EditJobPage updateJobSubmit={updatedJob} />}
          loader={jobLoader}
        />
        <Route
          path='/jobs/:_id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />

        <Route path='*' element={<NotFoundPage />} />

        {/* <Route path="/jobs/filter" element={<JobFilterPage />} /> */}
      </Route>

    )
  );

  return <RouterProvider router={router} />;

}
export default App;