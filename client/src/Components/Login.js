import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate()
    const host = 'http://localhost:5000'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function login(e) {
        setLoading(true)
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.token)
            setIsLoggedIn(true)
            setLoading(false)
            toast.success('You are successfully logged in')
            navigate('/')
        } else {
            setLoading(false)
            toast.error(json.errors);
        }
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="container mt-4 my-5 mx-5 border border-4 rounded-4" style={{ width: '600px' }}>
                    <h3 className='text-center mt-3 fw-bold'>Login</h3>
                    <form className='my-4 mx-4' onSubmit={login}>
                        <div className="mb-3">
                            <label htmlFor="input1" className="form-label">Email</label>
                            <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="input1"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="input2" className="form-label">Password</label>
                            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="input2" />
                        </div>
                        {loading && <button type="submit" disabled className="btn btn-primary">Login<i className="fa fa-spinner fa-spin fs-6 ms-1"></i></button>}
                        {!loading && <button type="submit" className="btn btn-primary">Login</button>}
                    </form>
                    <p className="text-center" style={{ fontSize: '14px', color: '#555', marginTop: '15px' }}>
                        Don't have an account? <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Signup</Link>
                    </p>
                </div>
            </div>

        </>
    )
}

export default Login