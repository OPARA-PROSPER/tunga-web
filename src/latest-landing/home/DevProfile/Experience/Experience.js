import React, { Component } from 'react';
import { groupBy, map } from 'lodash';
import './Experience.scss';
import TungaIcon from '../../../assets/img/common/icons/icon-tunga.png';
import WorkIcon from '../../../assets/img/common/icons/icon-work-experience.png';
import Carousel from '../../../shared/Carousel/Carousel';

/**
 * Handles Displaying experience section heading example Tunga Projects, Work Experience
 * @param {String} title - Title of the section
 * @param {object} icon - Section Icon
 * @returns {JSX}
 */
const Header = ({ title, icon }) => {
  return (
    <div className="Experience__header">
      <img src={icon} className="Experience__header-icon" />
      <div className="Experience__header-title">{title}</div>
    </div>
  );
};

/**
 * Handles displaying Tunga projects or Tunga Client Projects experience that the developer or designer has worked on
 * @param {object} project - Details of about the project
 * @returns {JSX}
 */
const TungaProject = project => {
  const { title, description, end_date, start_date, closed, project_link, repository_link } = project;
  return (
    <div className="Experience__project">
      <div className="Experience__title">{title}</div>
      <div className="Experience__date">
        {start_date} - {closed ? end_date : 'Ongoing'}
      </div>
      <div className="Experience__description">{description}</div>
      {(project_link || repository_link) && (
        <div className="Experience__links">
          {project_link && (
            <div>
              <a href={project_link} target="_blank">
                View project
              </a>
            </div>
          )}
          {project_link && repository_link && <span></span>}
          {repository_link && (
            <div>
              <a href={repository_link} target="_blank">
                View repository
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Handles displaying work experience
 * @param {object} work - Details of about a developer/designer's work experience
 * @returns {JSX}
 */
const WorkProject = work => {
  const { company, details, start_month_display, start_year, end_month_display, end_year, project_link, repository_link } = work;
  return (
    <div className="Experience__project">
      <div className="Experience__title">{company}</div>
      <div className="Experience__date">
        {start_month_display} {start_year} - {end_month_display} {end_year}
      </div>
      <div className="Experience__description">{details}</div>
      {(project_link || repository_link) && (
        <div className="Experience__links">
          {project_link && (
            <div>
              <a href={project_link} target="_blank">
                View project
              </a>
            </div>
          )}
          {project_link && repository_link && <span></span>}
          {repository_link && (
            <div>
              <a href={repository_link} target="_blank">
                View repository
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ExperienceItem = ({ experience }) => {
  if (experience.header) {
    return <Header {...experience} />;
  }

  if (experience.company) {
    return <WorkProject {...experience} />;
  }

  return <TungaProject {...experience} />;
};

class Experience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      talentId: false
    };
  }

  componentDidUpdate() {
    if (!this.state.talentId && this.props.talent.id) {
      this.setState({ talentId: this.props.talent.id });
      this.props.onPageLoad && this.props.onPageLoad();
    }
  }

  getDataPerPage() {
    return [
      {
        breakpoint: 992,
        perPage: 1,
        width: 100
      },
      {
        breakpoint: 768000,
        perPage: 3,
        width: 33.33
      }
    ];
  }

  render() {
    const { talent } = this.props;

    let items = [];
    if (talent.projects && talent.projects.length) {
      items.push({
        header: true,
        title: 'Tunga projects',
        icon: TungaIcon
      });
      items = items.concat([], talent.projects);
    }

    if (talent.work && talent.work.length) {
      items.push({
        header: true,
        title: 'Work experience',
        icon: WorkIcon
      });
      items = items.concat([], talent.work);
    }
    const keyedItems = items.map((item, index) => ({ ...item, index }));

    const groupedRows = groupBy(keyedItems, ({ index }) => {
      return Math.floor(index / 4);
    });
    const rows = map(groupedRows, row => row);
    const pagination = {
      total: rows.length,
      perPage: this.getDataPerPage()
    };

    return (
      <div id="Experience" className="Experience">
        <div className="Experience__heading">EXPERIENCE</div>
        <div className="Experience__container">
          <Carousel pagination={pagination} float="float-right" color="text-primary">
            <ul className="Experience__rows">
              {rows.map((row, key) => (
                <li className={`Experience__row Experience__row--${key}`} key={key}>
                  <div className={`Experience__item-container Experience__item-container--${key}`}>
                    <ul className="Experience__list">
                      {row.map((experience, j) => (
                        <li className="Experience__item" key={j}>
                          <ExperienceItem experience={experience} />
                        </li>
                      ))}
                      <li className="clearfix"></li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </Carousel>
        </div>
      </div>
    );
  }
}

Experience.propTypes = {};

export default Experience;
