import React from 'react';

import TaskPay from './TaskPay';
import BreadCrumb from '../containers/BreadCrumb';

const MultiTaskPay = props => {
    return (
        <div>
            <BreadCrumb
                section="Bulk Payment"
                parents={[{link: '/payments', name: 'Payments'}]}
            />
            <TaskPay {...props} />
        </div>
    );
};

export default MultiTaskPay;
