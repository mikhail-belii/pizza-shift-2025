import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../components/AuthContext'
import ProfileForm from '../components/ProfileForm'

const Login = () => {
    const {logout, isAuthorized} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/signin')
        }
    }, [isAuthorized, navigate])

    return (
        <div className='body-container'>
            <h1>Профиль</h1>
            <ProfileForm/>
           
        </div>
    )
}

export default Login