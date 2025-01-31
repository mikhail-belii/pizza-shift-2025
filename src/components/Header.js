import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import logo from '../img/logo.png'
import basket from '../img/basket.svg'
import login from '../img/login.svg'
import orders from '../img/clock.svg'
import profile from '../img/profile.svg'

const Header = () => {
    const {isAuthorized} = useContext(AuthContext)

    return (
        <header>
            <div className='navbar-el'>
                <Link to="/"><img src={logo} className='logo' alt='logo'></img></Link>
            </div>
            {isAuthorized? (
                <>
                    <div className='navbar-el'>
                        <Link to="/profile"><img src={profile} className='navbar-icon' alt='profile'></img>Профиль</Link>
                    </div>
                    <div className='navbar-el'>
                        <Link to="/orders"><img src={orders} className='navbar-icon' alt='orders'></img>Заказы</Link>
                    </div>
                    <div className='header-right'>
                        <div className='navbar-el basket-el'>
                            <Link to="/basket"><img src={basket} className='navbar-icon' alt='basket'></img>Корзина</Link>
                        </div>
                    </div>
                </>
            ) : (
                <div className='header-right'>
                    <div className='navbar-el basket-el'>
                        <Link to="/basket"><img src={basket} className='navbar-icon' alt='basket'></img>Корзина</Link>
                    </div>
                    <div className='navbar-el login-el'>
                        <Link to="/signin"><img src={login} className='navbar-icon' alt='login'></img>Войти</Link>
                    </div>
                </div>

            )}
    </header>
    )
}

export default Header