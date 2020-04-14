import React from 'react';

const SectionHeading = (
    {
        children,
    },
) => {
    return (
        <div>
            <div className="section-heading">{children}</div>
            <div className="section-heading-hr" />
        </div>
    );
};

export default SectionHeading;
