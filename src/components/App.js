import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Profile from '../pages/Profile'
import Header from './Header'

const PAGE_TITLES = {
    '/': 'Главная',
    '/signin': 'Авторизация',
    '/basket': 'Корзина',
    '/profile': 'Профиль',
    '/orders': 'Заказы'
}

const TitleUpdater = () => {
    const location = useLocation()

    useEffect(() => {
        const base = 'ШИФТ PIZZA'
        const route = location.pathname
        const title = PAGE_TITLES[route] || base
        document.title = title
    }, [location.pathname])

    return
}

const App = () => (
    <BrowserRouter>
        <Header/>
        <TitleUpdater/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
)

export default App