import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router';

import Avatar from './Avatar';
import Icon from './Icon';
import SearchBox from './SearchBox';


export default class NavBar extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        user: PropTypes.object,
        onSignOut: PropTypes.func,
        breakpoint: PropTypes.string,
    };

    static defaultProps = {
        breakpoint: 'lg',
    };

    onSignOut(e) {
        if(e) {
            e.preventDefault();
        }
        if(this.props.onSignOut) {
            this.props.onSignOut();
        }
    }

    render() {
        let {user} = this.props;

        return (
            <div>
                <nav className={`navbar navbar-expand-${this.props.breakpoint || 'lg'} fixed-top navbar-dark bg-primary ${this.props.className || ''}`}>
                    <Link to="/" className="navbar-brand">
                        <img src={require('../../legacy/images/logo.png')} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="tg-ic-bars"/>
                    </button>
                    {user?(
                        <div className="collapse navbar-collapse" id="navbar">
                            <ul className="navbar-nav ml-auto">
                                <li>
                                    <SearchBox variant="search"/>
                                </li>
                                {user.is_admin ? (
                                    <li className="nav-item dropdown">
                                        <a
                                            href="#"
                                            className="dropdown-toggle"
                                            data-toggle="dropdown"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-expanded="false">
                                            <Icon name="service-workflow" size="navbar"/> Manage <span className="caret"/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to="/help">
                                                    <Icon name="question" size="navbar"/> Help
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/people/invite">
                                                    <Icon name="add" size="navbar"/> Invite Users
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/dashboard/updates">
                                                    <Icon name="bell"  size="navbar"/> Updates dashboard
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                ) : null}
                                <li className="nav-item dropdown">
                                    <a
                                        href="#"
                                        className="dropdown-toggle"
                                        data-toggle="dropdown"
                                        role="button"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        {user.display_name} <span className="caret"/> <Avatar image={user.avatar_url} />
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-account">
                                        <li>
                                            <Link to="#" onClick={this.onSignOut.bind(this)}>
                                                <Icon name="logout" size="navbar"/> Sign Out
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    ):null}
                </nav>
            </div>
        );
    }
}

