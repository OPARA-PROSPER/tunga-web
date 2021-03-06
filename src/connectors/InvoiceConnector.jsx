import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import * as InvoiceActions from "../actions/InvoiceActions";

function mapStateToProps(state) {
    return {
        Invoice: state.app.Invoice
    };
}

function mapDispatchToProps(dispatch) {
    return {
        InvoiceActions: bindActionCreators(InvoiceActions, dispatch),
    };
}

export default function connectToStore(component) {
    return withRouter(connect(mapStateToProps, mapDispatchToProps)(component))
};
