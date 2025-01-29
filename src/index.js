import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './css/styles.css'
import { AuthProvider } from './components/AuthContext'

const app = ReactDOM.createRoot(document.getElementById('app'))

app.render(
    <AuthProvider>
        <App/>
    </AuthProvider>
)