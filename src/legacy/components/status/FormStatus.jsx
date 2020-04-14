import React from 'react';
import Progress from './Progress';
import DismissError from './Error';
import Success from './Success';

const FormStatus = (
    {
        loading,
        success,
        message,
        error,
        errorMessage,
    },
) => {
    return (
        <div>
            {loading ? <Progress /> : ''}
            {success ? (
                <Success message={message || 'Changes saved'} />
            ) : (
                ''
            )}
            {error ? (
                <DismissError
                    message={
                        errorMessage ||
                        'Please correct errors below'
                    }
                />
            ) : (
                ''
            )}
        </div>
    );
};

export default FormStatus;
