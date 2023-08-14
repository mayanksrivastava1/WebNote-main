import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = ({setIsLoggedIn}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const host = 'http://localhost:5000'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function signup(e) {
        setLoading(true)
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.token)
            setIsLoggedIn(true)
            setLoading(false)
            navigate('/')
            toast.success('Successfully registered')
        } else {
            setLoading(false)
            console.log(json);
           toast.error(json.errors)
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="container mt-4 my-5 mx-5 border border-4 rounded-4" style={{ width: '600px' }}>
                    <h3 className='text-center mt-3 fw-bold'>Sign Up</h3>
                    <form className='my-4 mx-4' onSubmit={signup} >
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Name</label>
                            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="inputName"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="inputEmail" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="inputPassword" />
                        </div>
                        {loading && <button type="submit" disabled className="btn btn-primary">Signup <i className="fa fa-spinner fa-spin fs-6 ms-1"></i></button>}
                        {!loading && <button type="submit" className="btn btn-primary">Signup</button>}
                    </form>
                    <p className="text-center" style={{ fontSize: '14px', color: '#555', marginTop: '15px' }}>
                        Already have an account? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Signup
