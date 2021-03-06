import React, { Component } from "react";
import "./SearchForm.scss";
import Icon from "../../../shared/core/Icon";
import { Input, IconGroup } from "../../../shared/Form/Form";
import { Redirect } from "react-router-dom";
import Routing from "../../../constants/Routing";


class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            onSearch: false,
        };
    }


    onFormSubmit = e => {
        e.preventDefault();
        if (this.state.query) {
            this.setState({
                onSearch: true,
            });
        }
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {
        if (this.state.onSearch) {
            return <Redirect to={{ pathname: `${Routing.ourTeam.path}`, search: `?query=${this.state.query}`, hash: 'talent-pool' }}/>;
        }

        return (
            <div className="SearchForm">
                <div className="SearchForm__container">
                    <form className="SearchForm__form" onSubmit={this.onFormSubmit}>
                        <div className="SearchForm__icon-group">
                            <IconGroup>
                                <Icon className="Form__input-icon Form__input-icon--light" name='search' size='card'/>
                                <Input className="Form__input--has-icon Form__input--b-b Form__input--light" type="text"
                                       name="query" value={this.state.query} onChange={this.handleChange}
                                       placeholder="Search by skills or technology"/>
                            </IconGroup>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchForm;
