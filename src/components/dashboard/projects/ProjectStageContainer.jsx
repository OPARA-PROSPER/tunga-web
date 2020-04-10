import React from 'react';

import ProjectManagement from './ProjectManagement';
import OpportunityManagement from './OpportunityManagement';


export default (props) => {
    const {project} = props;
    return (
        <>
            {project?(
                project.stage === 'opportunity'?(
                    <OpportunityManagement {...props} />
                ):(
                    <ProjectManagement {...props}/>
                )
            ):null}
        </>
    );
}
