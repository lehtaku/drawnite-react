import React from 'react'
import './PageTitle.css'

const PageTitle = () => {
    return (
        <div className="row">
            <div className="col-sm page-title">
                <div className="logo">
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" />
                </div>
            </div>
        </div>
    )
};

export default PageTitle;
