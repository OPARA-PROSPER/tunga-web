import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import randomstring from '../utils/generateRandomString';
import humanizeDuration from 'humanize-duration';
import moment from 'moment';
import Media from "react-media";

import Icon from "../core/Icon";
import Progress from "../core/Progress";
import IconButton from "../core/IconButton";
import connect from '../../connectors/ProfileConnector';

import {getUser, isAdmin, isClient, isDev, isPM} from "../utils/auth";
import {DOC_TYPE_OTHER, INVOICE_TYPE_SALE, STATUS_APPROVED, STATUS_PENDING} from "../../actions/utils/api";


class Dashboard extends React.Component {

    static defaultProps = {
        isLargeDevice: true
    };

    static propTypes = {
        isLargeDevice: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            targetKey: randomstring.generate(),
            cleared: []
        };
    }

    componentDidMount() {
        const {ProfileActions} = this.props;
        ProfileActions.getNotifications();
    }

    getDays(date) {
        let period = humanizeDuration((moment().unix() - moment.utc(date).add('day', 1).startOf('day').unix())*1000, { largest: 1, round: true, units: ['d']}).split(' ');
        return {number: period[0], name: period[1]};
    }

    onCloseNotification(readLog) {
        const {ProfileActions} = this.props;
        ProfileActions.createNotificationLog(readLog);
        this.setState({cleared: [...this.state.cleared, `${readLog.type}_${readLog.notification_id}`]});
    }

    renderNotification(text, linkText, linkUrl, type, id) {
        if(this.state.cleared.includes(`${type}_${id}`)) {
            return null;
        }
        const {isLargeDevice} = this.props,
            actionLink = linkUrl?(<Link to={linkUrl}>{linkText}</Link>):null;

        return (
            <div className="notification clearfix">
                <div className="float-right">
                    {isLargeDevice && actionLink?actionLink:null} <IconButton name="close" size="sm" disabled={!type && !id} onClick={this.onCloseNotification.bind(this, {type, notification_id: id})}/>
                </div>
                {text}
                {isLargeDevice || !actionLink?null:(
                    <div className="float-right">
                        {actionLink}
                    </div>
                )}
            </div>
        );
    }

    renderNotificationType(item) {
        let notificationType = 'activity';
        switch (item.activity_type)  {
            case 'participation':
                return this.renderNotification(
                    <div key={item.id}>
                        {getUser().id === item.activity.user.id?'You have':(<span><Link to={`/network/${item.activity.user.username}`}>{item.activity.user.display_name}</Link> has</span>)} been added to {isDev()?'the':'your'} team for {item.activity.project.title}
                    </div>,
                    'Go to project', `/projects/${item.activity.project.id}/team`, notificationType, item.id);
            case 'document':
                return this.renderNotification(
                    <div key={item.id}>
                        {getUser().id === item.activity.created_by.id?'You':(<span><Link to={`/network/${item.activity.created_by.username}`}>{item.activity.created_by.display_name}</Link></span>)} added a {item.activity.type !== DOC_TYPE_OTHER?item.activity.type:''} document to project {item.activity.project.title}
                    </div>,
                    'Go to project', `/projects/${item.activity.project.id}/docs`, notificationType, item.id);
            case 'invoice':
                if(isDev() && item.activity.user.id !== getUser().id) {
                    // Devs only see their own invoices
                    return null;
                }

                if(isClient() && !isAdmin() && item.activity.type !== INVOICE_TYPE_SALE) {
                    // Clients only see sales invoices
                    return null;
                }
                return this.renderNotification(
                    <div key={item.id}>
                        {getUser().id === item.activity.created_by.id?'You':(<span><Link to={`/network/${item.activity.created_by.username}`}>{item.activity.created_by.display_name}</Link></span>)} generated an invoice for {item.activity.project.title}: {item.activity.title}
                    </div>,
                    'Go to project', `/projects/${item.activity.project.id}/pay`, notificationType, item.id);
            case 'field_change_log':
                if(!['start_date', 'deadline', 'due_at'].includes(item.activity.field)) {
                    // On date changes
                    break;
                }
                const fieldDisplayMap = {
                    start_date: 'start date',
                    deadline: 'deadline',
                    due_at: 'milestone',
                };
                return this.renderNotification(
                    <div key={item.id}>
                        {getUser().id === item.activity.created_by.id?'You':(<span><Link to={`/network/${item.activity.created_by.username}`}>{item.activity.created_by.display_name}</Link></span>)} changed {item.activity.target_type === 'progress_event'?<span>due date for <Link to={`/projects/${item.activity.target.project.id}/events/${item.activity.target.id}`}>{item.activity.target.title}</Link></span>:<span>project {fieldDisplayMap[item.activity.field] || 'planning'}</span>} to {moment.utc(item.activity.new_value).local().format('Do, MMMM YYYY')} for {item.activity.target.project?item.activity.target.project.title:item.activity.target.title}
                    </div>,
                    'Go to project',
                    `/projects/${item.activity.target.project?item.activity.target.project.id:item.activity.target.id}/plan`,
                    notificationType, item.id
                );
            default:
                return null;
        }
    }

    renderReportSection(colProps) {
        const {Profile: {notifications: {invoices, reports, events}}} = this.props;

        return (
            <Row>
                <Col {...colProps}>
                    <div className="card">
                        {isDev() || isPM()?(
                            <div>
                                <div className="section-title">
                                    <Icon name="flag-checkered"/> Upcoming updates
                                </div>

                                <div className="card-content">
                                    {events.length?events.map(event => {
                                        return (
                                            <div key={event.id} className="item">
                                                Scheduled update for <Link to={`/projects/${event.project.id}/events/${event.id}`}>{event.project.title}{event.title?`: ${event.title}`:''}</Link>
                                            </div>
                                        );
                                    }):(
                                        <div>
                                            No upcoming updates
                                        </div>
                                    )}
                                </div>
                            </div>
                        ):(
                            <div>
                                <div className="section-title">
                                    <Icon name="newspaper-o"/> Latest progress reports
                                </div>

                                <div className="card-content">
                                    {reports.length?reports.map(report => {
                                        return (
                                            <div key={report.id} className="item clearfix">
                                                <div className="date float-right">{moment.utc(report.created_at).format('DD/MMM')}</div>
                                                Progress report from <Link to={`/network/${report.user.username}`}>{report.user.display_name}</Link> for <Link to={`/projects/${report.project.id}/events/${report.event.id}`}>{report.project.title}</Link>
                                            </div>
                                        );
                                    }):(
                                        <div>No new progress reports</div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </Col>
                <Col {...colProps}>
                    <div className="card">
                        <div className="section-title"><Icon name="cash"/> Upcoming payments</div>
                        {invoices.length?(
                            <div>
                                <div>
                                    Next payment for <Link to={`/projects/${invoices[0].project.id}/pay/`}>{invoices[0].full_title}</Link> is {invoices[0].is_overdue?<strong>overdue by</strong>:'due in'}:
                                </div>
                                <div className={`countdown ${invoices[0].is_overdue?'negative':''}`}>
                                    <span className="number">{this.getDays(invoices[0].due_at).number}</span>
                                    <span className="period">{this.getDays(invoices[0].due_at).name}</span>
                                </div>
                            </div>
                        ):(
                            <div>No upcoming payments.</div>
                        )}
                    </div>
                </Col>
            </Row>
        );
    }

    render() {

        const {Profile: {notifications: {profile, projects, activities}, isRetrieving}} = this.props;

        let shouldUpdateProfile = (profile.required.length || profile.optional.length) && !(profile.cleared || []).includes('complete'),
            shouldConnectPayoneer = isDev() && ![STATUS_APPROVED, STATUS_PENDING].includes(getUser().payoneer_status)  && !(profile.cleared || []).includes('payoneer'),
            hasActivities = activities.length;

        return (
            <div className="dashboard">
                {isRetrieving.notifications?(
                    <Progress/>
                ):(
                    <Media query="(max-width: 576px)">
                        {isSmallDevice => (
                            <>
                                <Row>
                                    <Col sm={8}>
                                        <div className="card notification-card">
                                            <div className="section-title"><Icon name="bell"/> Notifications</div>

                                            <div className="card-content">
                                                {shouldUpdateProfile || shouldConnectPayoneer || hasActivities?(
                                                    <div>
                                                        {shouldUpdateProfile?(
                                                            this.renderNotification(
                                                                <div>Please complete your profile {profile.required.length?<span>to be able to {isDev()?'accept':'create'} projects</span>:''}</div>,
                                                                'Go to profile', '/settings/', 'profile', 'complete'
                                                            )
                                                        ):null}

                                                        {shouldConnectPayoneer?(
                                                            this.renderNotification(
                                                                'Please connect your account with Payoneer to receive payments',
                                                                'Set up Payoneer', '/settings/payment/', 'profile', 'payoneer'
                                                            )
                                                        ):null}

                                                        {activities.length?(
                                                            activities.slice(0, 10 - ((shouldUpdateProfile?1:0)+(shouldConnectPayoneer?1:0))).map(item => {
                                                                return this.renderNotificationType(item);
                                                            })
                                                        ):null}
                                                    </div>
                                                ):(
                                                    <div>No notifications</div>
                                                )}
                                            </div>
                                        </div>
                                        {isSmallDevice?null:(
                                            this.renderReportSection({sm: 6})
                                        )}
                                    </Col>
                                    <Col sm={4}>
                                        <div className="card">
                                            <div className="section-title"><Icon name="projects"/> {isDev()?'Projects I am working on':'Running projects'}</div>

                                            <div className="card-content">
                                                {projects.length?projects.map(project => {
                                                    return (
                                                        <div key={project.id} className="project-item">
                                                            <Link to={`/projects/${project.id}`}>{project.title}</Link>
                                                        </div>
                                                    );
                                                }):(
                                                    <div>No projects</div>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                {isSmallDevice?(
                                    this.renderReportSection({sm: 12})
                                ):null}
                            </>
                        )}
                    </Media>
                )}
            </div>
        );
    }
}

export default connect(Dashboard);
