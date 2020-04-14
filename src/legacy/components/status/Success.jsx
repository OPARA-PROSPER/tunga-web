import React from 'react';

const Success = (
    {
        message,
    },
) => {
    return (
        <div className="alert alert-success" role="alert">
            {message || 'Success'}
        </div>
    );
};

export default Success;
