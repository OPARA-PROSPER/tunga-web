import React from 'react';

const Error = (
    {
        message,
    },
) => {
    return (
        <div className="alert alert-warning" role="alert">
            {message || 'Unknown error'}
        </div>
    );
};

export default Error;
