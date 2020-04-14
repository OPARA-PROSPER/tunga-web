import PropTypes from 'prop-types';
import React from 'react';

import TaskForm from './TaskForm';

const ProjectTaskForm = props => {
    const {task} = props;
    var new_props = {...props};
    new_props.task = null;
    return <TaskForm project={task} {...new_props} />;
};

export default ProjectTaskForm;

ProjectTaskForm.propTypes = {
    task: PropTypes.object.isRequired,
};
