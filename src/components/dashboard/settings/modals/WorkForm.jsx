import React from 'react';
import { FormGroup } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';

import CustomInputGroup from '../../../core/CustomInputGroup';
import TextArea from '../../../core/TextArea';
import FieldError from '../../../core/FieldError';
import Success from '../../../core/Success';
import DateTimePicker from '../../../core/DateTimePicker';
import Button from '../../../core/Button';
import Input from '../../../core/Input';
import { validURL } from '../../../utils/validation';

export default class WorkForm extends React.Component {
  constructor(props) {
    super(props);
    let initialWorkState = {
      company: '',
      position: '',
      details: '',
      project_link: '',
      repository_link: ''
    };
    this.state = {
      work: _.isEmpty(props.work) ? { ...initialWorkState } : props.work,
      userErrors: { project_link: false, repository_link: false }
    };
  }

  validationHandler = (inputName, inputValue) => {
    const { userErrors } = this.state;
    if (inputValue.length >= 1 && !validURL(inputValue)) {
      return this.setState({ userErrors: { ...userErrors, [inputName]: true } });
    }
    return this.setState({ userErrors: { ...userErrors, [inputName]: false } });
  };

  onInputChange(key, e) {
    let newState = {};
    newState[key] = e.target.value;
    this.setState({ work: { ...this.state.work, ...newState } });
  }

  handleLinksChange = event => {
    const { work, touched } = this.state;
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ work: { ...work, [event.target.name]: event.target.value } }, () => this.validationHandler(name, value));
  };

  onDateChange(from = true, dateSelected) {
    const momentDate = moment(dateSelected);
    const month = momentDate.month() + 1;
    const year = momentDate.year();
    let newState = {};
    if (from) {
      newState = { start_year: year, start_month: month };
    } else {
      newState = { end_year: year, end_month: month };
    }
    this.setState({ work: { ...this.state.work, ...newState } });
  }

  onSave = e => {
    e.preventDefault();
    const {
      userErrors: { project_link, repository_link }
    } = this.state;
    if (project_link || repository_link) return;
    const { proceed } = this.props;
    if (proceed) {
      proceed(this.state.work);
    }
    return;
  };

  render() {
    const { errors } = this.props,
      start_date = `${this.state.work.start_year}-${this.state.work.start_month}`,
      end_date = `${this.state.work.end_year}-${this.state.work.end_month}`;
    const {
      work: { project_link, repository_link },
      userErrors
    } = this.state;
    return (
      <div>
        {this.props.isSaved.work ? <Success message="Work Experience saved successfully" /> : null}
        <form onSubmit={this.onSave} name="work" role="form" ref="work_form">
          <div className="row">
            <div className="col-sm-12">
              {errors.work && errors.work.company ? <FieldError message={errors.work.company} /> : null}
              <FormGroup>
                <label className="control-label">Company name</label>
                <Input onChange={this.onInputChange.bind(this, 'company')} value={this.state.work.company} required />
              </FormGroup>
            </div>
            <div className="col-sm-12">
              {errors.work && errors.work.position ? <FieldError message={errors.work.position} /> : null}
              <FormGroup>
                <label className="control-label">Job title</label>
                <CustomInputGroup onChange={this.onInputChange.bind(this, 'position')} value={this.state.work.position} required />
              </FormGroup>
            </div>
            <div className="col-sm-12">
              <label className="control-label">Timespan</label>
            </div>
            <div className="col-sm-6">
              {errors.work && (errors.work.start_year || errors.work.start_month) ? (
                <FieldError message={errors.work.start_year || errors.work.start_month} />
              ) : null}
              <FormGroup>
                <div>From</div>
                <DateTimePicker
                  onChange={this.onDateChange.bind(this, true)}
                  calendar={true}
                  time={false}
                  value={this.state.work.start_year ? new Date(moment.utc(start_date).format()) : null}
                  format="MMM/YYYY"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-sm-6">
              {errors.work && (errors.work.end_year || errors.work.end_month) ? (
                <FieldError message={errors.work.end_month || errors.work.end_month} />
              ) : null}
              <FormGroup>
                <div>To</div>
                <DateTimePicker
                  onChange={this.onDateChange.bind(this, false)}
                  calendar={true}
                  time={false}
                  value={this.state.work.end_year ? new Date(moment.utc(end_date).format()) : null}
                  format="MMM/YYYY"
                />
              </FormGroup>
            </div>
            <div className="col-sm-12">
              <FormGroup>
                <label className="control-label">Experience</label>
                <TextArea onChange={this.onInputChange.bind(this, 'details')} value={this.state.work.details} required />
              </FormGroup>
            </div>
            <div className="col-sm-6">
              {userErrors.project_link && <FieldError message="Please enter a valid link" />}
              <FormGroup>
                <label className="control-label">Project Link</label>
                <Input onChange={this.handleLinksChange} name="project_link" value={project_link} />
              </FormGroup>
            </div>
            <div className="col-sm-6">
              {userErrors.repository_link && <FieldError message="Please enter a valid link" />}
              <FormGroup>
                <label className="control-label">Repository Link</label>
                <Input onChange={this.handleLinksChange} name="repository_link" value={repository_link} />
              </FormGroup>
            </div>
          </div>
          <div>
            <div className="float-left">
              <Button type="button" variant="secondary" onClick={() => this.props.dismiss()}>
                Cancel
              </Button>
            </div>
            <div className="float-right">
              <Button type="submit" disabled={this.props.isSaving.work}>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
