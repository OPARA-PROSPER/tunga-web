import PropTypes from 'prop-types';
import React from 'react';
import {Row, Col} from 'reactstrap';

import ProjectCard from './ProjectCard';
import Progress from "../../core/Progress";
import LoadMore from "../../core/LoadMore";

const ProjectList = props =>  {
    const {projects, onLoadMore, hasMore, isLoading, isLoadingMore} = props;

    return isLoading ? <Progress/> : projects.length ? (
        <div>
            <Row className="card-list">
                {projects.map(project => {
                    return (
                        <Col key={`project-card--${project.id}`} sm="4">
                            <ProjectCard project={project}/>
                        </Col>
                    );
                })}
            </Row>

            <LoadMore hasMore={hasMore} isLoadingMore={isLoadingMore} onLoadMore={onLoadMore}/>
        </div>
    ) : null;
};

ProjectList.propTypes = {
    projects: PropTypes.array,
    onLoadMore: PropTypes.func,
    isLoading: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    hasMore: PropTypes.bool,
};

export default ProjectList;
