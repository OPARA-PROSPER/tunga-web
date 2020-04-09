import React from 'react';
import Helmet from 'react-helmet';

const MetaTags = props => {
    const {title, description, keywords} = props;

    return (
        <Helmet>
            <title>{title}</title>
            <link rel="canonical" href={window.location.href} />
            <meta name="description" content={description} />

            <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />

            {keywords ? <meta name="keywords" content={keywords} /> : null}
        </Helmet>
    );
};

export default MetaTags;
