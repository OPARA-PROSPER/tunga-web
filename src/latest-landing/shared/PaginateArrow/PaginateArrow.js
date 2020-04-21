import React, { Component } from "react";
import "./PaginateArrow.scss";
import Icon from "../core/Icon";
import PropTypes from 'prop-types';

PaginateArrow.propTypes = {
    This: PropTypes.any,
    color: PropTypes.string,
    float: PropTypes.string 
};

class PaginateArrow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { This, color, float } = this.props;
        const { paginate, data } = This.state;
        return (
            <span className="PaginateArrow">
                <span className={float}>
                    <Icon
                        onClick={() => This.paging(paginate.current - 3)}
                        className={`${paginate.current === 1 ? "text-gray" : color} mr-3`}
                        name="previous"
                        size="md"
                    />
                    &nbsp;
                    <Icon
                        onClick={() => This.paging(paginate.current + 3)}
                        className={
                            paginate.current >=
                            Math.ceil(data.length / paginate.perPage)
                                ? "text-gray"
                                : color
                        }
                        name="next"
                        size="md"
                    />
                    {/*<button onClick={() => this.paging(this.state.paginate.current - 1)}>Previous</button>*/}
                    {/*<button onClick={() => this.paging(this.state.paginate.current + 1)}>Next</button>*/}
                </span>
                <span className="clearfix" />
            </span>
        );
    }
}

PaginateArrow.propTypes = {};

export default PaginateArrow;
