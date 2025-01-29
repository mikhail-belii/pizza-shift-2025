import React, { useContext } from 'react'
import { AuthContext } from '../components/AuthContext'

const Home = () => {
    const {isAuthorized} = useContext(AuthContext)

    return (
        <div className='body-container'>
            <h1>Главная</h1>
            {isAuthorized ? (
                <p>Добро пожаловать, вы авторизованы!</p>
            ) : (
                <p>Пожалуйста, войдите в систему.</p>
            )}
        </div>
    )
}

export default Home