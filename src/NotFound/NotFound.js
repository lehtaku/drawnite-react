import React from 'react';

const NotFound = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">404 - Not Found</h1>
            <p className="lead">Site you were looking for, not found</p>
            <hr className="my-4" />
                <p>Try go back to home</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="/" role="button">Learn more</a>
                </p>
        </div>
    )
};

export default NotFound;
