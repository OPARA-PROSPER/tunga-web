import React from 'react';
import PropTypes from 'prop-types';
import randomstring from '../../utils/generateRandomString';
import _ from 'lodash';

import Progress from "../../core/Progress";

import {addPropsToChildren} from "../../core/utils/children";

export default class InvoiceListContainer extends React.Component  {

    static propTypes = {
        filters: PropTypes.object,
        selectionKey: PropTypes.string,
    };

    static defaultProps = {
        filters: {},
        selectionKey: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            selectionKey: props.selectionKey || randomstring.generate(),
            prevKey: null,
        };
    }

    componentDidMount() {
        this.getList();
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if(!_.isEqual(prevProps.filters, this.props.filters)) {
            this.getList();
        }
    }

    getList() {
        const {InvoiceActions} = this.props;
        InvoiceActions.listInvoices({...(this.props.filters || {})}, this.state.selectionKey, this.state.prevKey);
    }

    renderChildren() {
        const {Invoice, InvoiceActions, children} = this.props,
            selectionKey = this.state.selectionKey;

        return addPropsToChildren(children, {
            invoices: (Invoice.ids[selectionKey] || []).map(id => {
                return Invoice.invoices[id];
            }),
            onLoadMore: () => {
                InvoiceActions.listMoreInvoices(Invoice.next[selectionKey], selectionKey);
            },
            isLoading: Invoice.isFetching[selectionKey],
            isLoadingMore: Invoice.isFetchingMore[selectionKey],
            hasMore: !!Invoice.next[selectionKey],
            isSaved: Invoice.isSaved,
            isSaving: Invoice.isSaving,
            selectionKey,
            InvoiceActions
        });
    }

    render() {
        const {Invoice} = this.props,
            selectionKey = this.state.selectionKey;

        return (
            <>
                {Invoice.isFetching[selectionKey]?(
                    <Progress/>
                ):(
                    this.renderChildren()
                )}
            </>
        );
    }
}
