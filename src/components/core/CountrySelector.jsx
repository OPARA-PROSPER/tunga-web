import PropTypes from 'prop-types';
import React from 'react';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Select from './Select';

import { filterEventProps } from "./utils/events";
import { getCountries } from "../../legacy/actions/ProfileActions";
import {filterInputProps} from "./utils/input";

class CountrySelector extends React.Component {
    static defaultProps = {
        placeholder: '-- Select a country --'
    };

    static propTypes = {
        className: PropTypes.string,
        selected: PropTypes.string,
        onChange: PropTypes.func,
        size: PropTypes.string,
        placeholder: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {selected: props.selected};
    }

    componentDidMount() {
        const {countries, getCountries} = this.props;
        if((!countries || countries.length === 0)) {
            getCountries();
        }
    }

    onChange(e) {
        let choice = e.target.value;
        this.setState({selected: choice});
        if(this.props.onChange) {
            this.props.onChange(choice);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.selected !== this.props.selected) {
            this.setState({selected: nextProps.selected});
        }
    }

    getOptions() {
        let options = [];
        options.push(['', this.props.placeholder || '-- Select a country --']);

        const {countries} = this.props;

        if(countries && countries.length) {
            countries.forEach(country => {
                if(country.code) {
                    options.push([country.code, country.name]);
                }
            })
        }
        return options;
    }

    render() {
        return (
            <Select className={this.props.className}
                    size={this.props.size}
                    options={this.getOptions()}
                    placeholder={null}
                    selected={this.state.selected}
                    {...filterInputProps(this.props)}
                    {...filterEventProps(this.props)}
                    onChange={this.onChange.bind(this)}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        countries: state.Profile.countries
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCountries: bindActionCreators(getCountries, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CountrySelector));
