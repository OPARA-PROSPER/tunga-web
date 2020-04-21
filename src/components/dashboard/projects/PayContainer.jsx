import PropTypes from 'prop-types';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Pay from "./Pay";

import InvoiceListContainer from "../../dashboard/payments/InvoiceListContainer";
import connect from "../../../connectors/InvoiceConnector";

const PayContainer = props => {
    const {project, match, Invoice, InvoiceActions} = props;
    return (
        <>
            <Switch>
                <Route path={match.url}
                       exact
                       render={props => <InvoiceListContainer {...props}
                                                              filters={{project: project.id}}
                                                              Invoice={Invoice}
                                                              InvoiceActions={InvoiceActions}>
                           <Pay project={project} {...props}/>
                       </InvoiceListContainer>}
                />
            </Switch>
        </>
    );
};

PayContainer.propTypes = {
    project: PropTypes.object,
    match: PropTypes.object,
};

export default connect(PayContainer);
