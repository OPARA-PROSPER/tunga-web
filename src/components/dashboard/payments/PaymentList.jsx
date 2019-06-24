import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'reactstrap';
import moment from 'moment';

import Button from "../../core/Button";
import Progress from "../../core/Progress";
import Icon from "../../core/Icon";
import StripeButton from "../../core/StripeButton";
import PaymentOptions from "./PaymentOptions";
import InvoiceDetails from "./InvoiceDetails";

import {openConfirm, openModal} from "../../core/utils/modals";
import {getUser, isAdmin, isClient, isDev, isPayAdmin, isProjectClient} from "../../utils/auth";
import {batchInvoices} from "../../utils/payments";
import {ENDPOINT_INVOICES} from "../../../actions/utils/api";
import {parsePaymentObject} from "../../utils/stripe";
import LoadMore from "../../core/LoadMore";

const PAID_IN = 'paid-in';
const PENDING_IN = 'pending-in';
const PAID_OUT = 'paid-out';
const PENDING_OUT = 'pending-out';

export default class PaymentList extends React.Component {

    static defaultProps = {
        invoices: [],
        filter: null,
        isSaving: {}
    };

    static propTypes = {
        invoices: PropTypes.array,
        filter: PropTypes.string,
        isSaving: PropTypes.object,
        history: PropTypes.object,
        onLoadMore: PropTypes.func,
        isLoading: PropTypes.bool,
        isLoadingMore: PropTypes.bool,
        hasMore: PropTypes.bool,
    };


    componentDidMount() {
        const { history, filter } = this.props;
        if(history && ![...(isDev()?[]:[PENDING_IN, PAID_IN]), PENDING_OUT, PAID_OUT].includes(filter)) {
            history.push('/payments');
        }
    }

    onMarkPaid(invoiceId) {
        const { InvoiceActions } = this.props;
        openConfirm(
            <div className="font-weight-bold">Are you sure you want to mark this invoice as paid?</div>, '',
            true, {ok: 'Yes'}
        ).then(response => {
            InvoiceActions.updateInvoice(invoiceId, {paid: true}, this.props.selectionKey);
        }, error => {
            // Nothing
        });
    }

    onMarkArchived(invoiceId) {
        const { InvoiceActions } = this.props;
        openConfirm(
            <div className="font-weight-bold">Are you sure you want to mark this invoice as archived?</div>, '',
            true, {ok: 'Yes'}
        ).then(response => {
            InvoiceActions.archiveInvoice(invoiceId, this.props.selectionKey);
        }, error => {
            // Nothing
        });
    }

    onGenerateInvoice(invoiceId) {
        const {InvoiceActions} = this.props;
        openConfirm(
            <div className="font-weight-bold">Are you sure you want to generate an invoice for this payment?</div>, '',
            true, {ok: 'Yes'}
        ).then(response => {
            InvoiceActions.generateInvoice(invoiceId, this.props.selectionKey);
        }, error => {
            // Nothing
        });
    }

    onApprovePayout(invoices) {
        const { InvoiceActions } = this.props;
        openConfirm(
            <div className="font-weight-bold">Are you sure you want to approve this payout?</div>, '',
            true, {ok: 'Yes'}
        ).then(response => {
            invoices.forEach(invoice => {
                InvoiceActions.updateInvoice(invoice.id, {status: 'approved'}, this.props.selectionKey);
            });
        }, error => {
            // Nothing
        });
    }

    openPay(invoice) {
        openModal(<PaymentOptions/>, 'Payment options', true, {className: 'modal-pay'}).then(type => {
            if(type === 'card') {
                $(`.pay_stripe_${invoice.id}`).click();
            } else {
                openModal(
                    <InvoiceDetails invoice={invoice}/>,
                    'Download Invoice', true, {className: 'modal-pay'}
                );
            }
        }).catch(error=> {

        });
    }

    onPay(invoice, token) {
        const {InvoiceActions} = this.props;
        InvoiceActions.payInvoice(invoice.id, parsePaymentObject(invoice, token), this.props.selectionKey);
    }

    render() {
        const {filter, invoices, isSaving, onLoadMore, hasMore, isLoading, isLoadingMore} = this.props;

        if(![...(isDev()?[]:[PENDING_IN, PAID_IN]), PENDING_OUT, PAID_OUT].includes(filter)) {
            return null;
        }

        let invoiceList = invoices;
        if([PENDING_OUT, PAID_OUT].includes(filter)) {
            invoiceList = batchInvoices(invoices);
        }

        return (
            <React.Fragment>
                <div className="content-card payments-list-card">
                    {invoiceList.length?(
                        <Table striped>
                            <thead>
                            <tr>
                                <th>
                                    {isClient() && !isAdmin()?'':'Client/'} Project/ Invoice
                                </th>
                                {[PENDING_OUT, PAID_OUT].includes(filter)?(
                                    <th>Developer</th>
                                ):null}
                                <th>Invoice Number</th>
                                {[PENDING_IN, PAID_IN].includes(filter)?(
                                    <th>Sum</th>
                                ):null}
                                {isClient() && !isAdmin()?null:(
                                    <th>Payout</th>
                                )}
                                {filter === PENDING_IN?(
                                    <React.Fragment>
                                        <th>Invoice Date</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                    </React.Fragment>
                                ):null}
                                {filter === PAID_IN?(
                                    <th>Payment Date</th>
                                ):null}
                                {filter === PENDING_OUT?(
                                    <React.Fragment>
                                        <th>Payout Date</th>
                                        <th></th>
                                    </React.Fragment>
                                ):null}
                                {filter === PAID_OUT?(
                                    <th>Payment Date</th>
                                ):null}
                            </tr>
                            </thead>
                            <tbody>
                            {invoiceList.map(invoice => {
                                const owner = invoice.project.owner || invoice.project.user;
                                return (
                                    <tr key={invoice.id}>
                                        <td>
                                            {isClient() && !isAdmin()?null:(
                                                <div>{(owner.company?owner.company.name:'') || owner.display_name}</div>
                                            )}
                                            <a href={`/projects/${invoice.project.id}`} target="_blank">{invoice.project.title}</a><br/>
                                            {invoice.title}
                                        </td>
                                        {[PENDING_OUT, PAID_OUT].includes(filter)?(
                                            <td>{invoice.invoices.map(item => {
                                                return (
                                                    <div key={item.id}>{item.user.display_name}</div>
                                                );
                                            })}</td>
                                        ):null}
                                        <td>{[PENDING_OUT, PAID_OUT].includes(filter)?(
                                            invoice.invoices.map(item => {
                                                return (
                                                    <div key={item.id}>
                                                        <a href={`${ENDPOINT_INVOICES}${item.id}/download/?format=pdf`} target="_blank">
                                                            {item.number}
                                                        </a>
                                                    </div>
                                                );
                                            })
                                        ):(invoice.number && (invoice.finalized || invoice.last_sent_at))?(
                                            <a href={`${ENDPOINT_INVOICES}${invoice.id}/download/?format=pdf`} target="_blank">
                                                {invoice.number}
                                            </a>
                                        ):null}</td>
                                        {[PENDING_IN, PAID_IN].includes(filter)?(
                                            <td>
                                                {invoice.total_amount === invoice.amount?(
                                                    <div>€{invoice.amount}</div>
                                                ):(
                                                    <div>
                                                        <div className="clearfix">
                                                            <div className="float-left">Fee:</div>
                                                            <div className="float-right">€{invoice.amount}</div>
                                                        </div>
                                                        {Math.round(invoice.processing_fee)?(
                                                            <div className="clearfix">
                                                                <div className="float-left">Processing:</div>
                                                                <div className="float-right">€{invoice.processing_fee}</div>
                                                            </div>
                                                        ):null}
                                                        {Math.round(invoice.tax_amount)?(
                                                            <div className="clearfix">
                                                                <div className="float-left">VAT:</div>
                                                                <div className="float-right">€{invoice.tax_amount}</div>
                                                            </div>
                                                        ):null}
                                                        <div className="subtotal">
                                                            <div className="float-left">Total:</div>
                                                            <div className="float-right">€{invoice.total_amount}</div>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ):null}
                                        {isClient() && !isAdmin()?null:(
                                            <td>
                                                {[PENDING_OUT, PAID_OUT].includes(filter)?(
                                                    <div>
                                                        {invoice.invoices.map(item => {
                                                            return (
                                                                <div>€{item.amount}</div>
                                                            );
                                                        })}
                                                        {isDev()?null:(
                                                            <div className="subtotal">€{invoice.amount}</div>
                                                        )}
                                                    </div>
                                                ):null}
                                            </td>
                                        )}
                                        {filter === PENDING_IN?(
                                            <React.Fragment>
                                                <td>{moment.utc(invoice.issued_at).format('DD/MMM/YYYY')}</td>
                                                <td className={invoice.is_overdue?'font-weight-medium':''}>
                                                    {invoice.is_overdue?(<Icon name="warning" size="icon"/>):null}
                                                    {' '}{moment.utc(invoice.due_at).format('DD/MMM/YYYY')}
                                                </td>
                                                <td>
                                                    {(isClient() || isAdmin())?(
                                                        <div>
                                                            {invoice.paid?(
                                                                <div>
                                                                    <Icon name="check" className="green"/> Paid
                                                                </div>
                                                            ):isSaving[invoice.id]?(
                                                                <Progress message="Processing"/>
                                                            ):(
                                                                <div>
                                                                    {isProjectClient(invoice.project) || isPayAdmin()?(
                                                                        <React.Fragment>
                                                                            <StripeButton size="sm"
                                                                                          amount={invoice.total_amount}
                                                                                          email={getUser().email}
                                                                                          description={invoice.title}
                                                                                          onPay={this.onPay.bind(this, invoice)}
                                                                                          className={`pay_stripe_${invoice.id}`}/>
                                                                            <Button size="sm" onClick={this.openPay.bind(this, invoice)}><Icon name="cash"/> Pay</Button>
                                                                        </React.Fragment>
                                                                    ):null}
                                                                    {isPayAdmin() && !invoice.paid?(
                                                                        <React.Fragment>
                                                                            {invoice.finalized || invoice.last_sent_at?(
                                                                                <Button size="sm"
                                                                                        onClick={this.onMarkPaid.bind(this, invoice.id)}>
                                                                                    Mark as paid
                                                                                </Button>
                                                                            ):(
                                                                                <Button size="sm"
                                                                                        onClick={this.onGenerateInvoice.bind(this, invoice.id)}>
                                                                                    Generate Invoice
                                                                                </Button>
                                                                            )}
                                                                            <Button size="sm"
                                                                                    onClick={this.onMarkArchived.bind(this, invoice.id)}>
                                                                                Mark as archived
                                                                            </Button>
                                                                        </React.Fragment>
                                                                    ):null}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ):null}
                                                </td>
                                            </React.Fragment>
                                        ):null}
                                        {filter === PAID_IN?(
                                            <td>{moment.utc(invoice.paid_at).format('DD/MMM/YYYY')}</td>
                                        ):null}
                                        {filter === PENDING_OUT?(
                                            <React.Fragment>
                                                <td>{invoice.invoices.map(item => {
                                                    return (
                                                        <div key={item.id}>{moment.utc(item.issued_at).format('DD/MMM/YYYY')}</div>
                                                    );
                                                })}</td>
                                                <td>
                                                    {isPayAdmin() && !invoice.paid && invoice.status !== 'approved'?(
                                                        <Button size="sm"
                                                                onClick={this.onApprovePayout.bind(this, invoice.invoices)}>
                                                            Approve payout
                                                        </Button>
                                                    ):invoice.status === 'approved' && !invoice.paid?(
                                                        <div>Processing</div>
                                                    ):null}
                                                </td>
                                            </React.Fragment>
                                        ):null}
                                        {filter === PAID_OUT?(
                                            <td>{invoice.invoices.map(item => {
                                                return (
                                                    <div key={item.id}>{moment.utc(item.paid_at).format('DD/MMM/YYYY')}</div>
                                                );
                                            })}</td>
                                        ):null}
                                    </tr>
                                );
                            })}
                            </tbody>
                        </Table>
                    ):(
                        <div className="empty-list">You have no payments yet.</div>
                    )}
                </div>

                <LoadMore hasMore={hasMore} isLoadingMore={isLoadingMore} onLoadMore={onLoadMore}/>
            </React.Fragment>
        );
    }
}
