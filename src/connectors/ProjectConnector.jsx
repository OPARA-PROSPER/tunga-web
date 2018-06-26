import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import * as ProjectActions from "../actions/ProjectActions";
import * as ParticipationActions from "../actions/ParticipationActions";
import * as DocumentActions from "../actions/DocumentActions";

function mapStateToProps(state) {
    return {
        Project: state.Project
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ProjectActions: {
            ...bindActionCreators(ProjectActions, dispatch),
            ...bindActionCreators(ParticipationActions, dispatch),
            ...bindActionCreators(DocumentActions, dispatch),
        }
    };
}

export default function connectToStore(component) {
    return withRouter(connect(mapStateToProps, mapDispatchToProps)(component))
};
