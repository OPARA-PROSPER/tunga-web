import React from 'react';
import Icon from "../core/Icon";

const Attachments = props => {
    const {attachments} = props;

    return (
        <div className="attachments">
            {attachments.map(attachment => {
                return (
                    <div key={attachment.id} className="file">
                        <a href={attachment.url} target="_blank">
                            <Icon name="download" />{' '}
                            {attachment.name}{' '}
                            <strong>[{attachment.display_size}]</strong>
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

export default Attachments;
