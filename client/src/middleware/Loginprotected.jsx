import React from 'react'
import { Navigate } from 'react-router-dom';

export default function Loginprotected({ children }) {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to='/' replace={true}></Navigate>
    }
    return children;
}
