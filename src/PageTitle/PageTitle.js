import React from 'react'
import './PageTitle.css'

const PageTitle = () => {
    return (
        <div>
            <div className="logo">
                <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" />
            </div>
            <h4>Pre-Game lobby</h4>
        </div>
    )
};

export default PageTitle;
