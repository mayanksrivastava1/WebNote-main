import React from 'react'
const Spinner = () => {
    return (
        <>
            <div className="con" style={{ textAlign: 'center' }}>
                <div className="spinner-border mt-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner
