import React from 'react';

export default class Progress extends React.Component {
    render() {
        return (
            <div className="loading">
                <img src={require('../../images/rolling.gif').default} />{' '}
                {this.props.message || ''}
            </div>
        );
    }
}
