import { NavLink, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = ({setIsLoggedIn}) => {
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        toast.error('Logged out')
        navigate('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" id='Nav'>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">WebNote</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="list">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Your Notes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/addNote">AddNote</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex">
                            {!localStorage.getItem('token') && <NavLink className="btn btn-primary mx-1" to="/login" role="button">Login</NavLink>}
                            {localStorage.getItem('token') && <button type="button" onClick={handleLogout} className="btn btn-primary">Logout</button>}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
