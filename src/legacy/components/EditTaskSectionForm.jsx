import React from 'react';

import TaskForm from './TaskForm';

const EditTaskSectionForm = props => {
    var new_props = {...props};

    if (props.params && props.params.editSection) {
        let editSection = props.params.editSection;
        new_props.enabledWidgets = [props.params.editSection];
    }

    return <TaskForm {...new_props} />;
};

export default EditTaskSectionForm;
