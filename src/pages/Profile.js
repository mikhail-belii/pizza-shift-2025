import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../components/AuthContext'
import ProfileForm from '../components/ProfileForm'

const Login = () => {
    const {isAuthorized} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/signin')
        }
    }, [isAuthorized, navigate])

    return (
        <div className='body-container'>
            <ProfileForm/>
           
        </div>
    )
}

export default Login