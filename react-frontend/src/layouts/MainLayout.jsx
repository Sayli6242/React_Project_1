import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const MainLayouts = () => {
    return (
        <>
            <Navbar />
            <ToastContainer />
            <Outlet />
        </>
    )
}

export default MainLayouts