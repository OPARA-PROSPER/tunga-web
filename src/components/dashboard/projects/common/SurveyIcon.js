import React from 'react';

import Smiley1 from './icons/Smiley1';
import Smiley2 from './icons/Smiley2';
import Smiley3 from './icons/Smiley3';
import Smiley4 from './icons/Smiley4';
import Smiley5 from './icons/Smiley5';

const IconSvg = ({ rating, active }) => {
  switch (rating) {
    case 1:
      return <Smiley1 active={active} />;
    case 2:
      return <Smiley2 active={active} />;
    case 3:
      return <Smiley3 active={active} />;
    case 4:
      return <Smiley4 active={active} />;
    case 5:
      return <Smiley5 active={active} />;
  }
};

export default class SurveyIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentRating: props.rating || null };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.rating !== this.props.rating && this.props.rating !== this.state.currentRating) {
      this.setState({ currentRating: this.props.rating });
    }
  }

  onIconClick = newRating => {
    const { onRating, disable } = this.props;
    if (disable) return false;
    this.setState({ currentRating: newRating });
    if (onRating) onRating(newRating);
  };

  render() {
    const { disable, readOnly } = this.props,
      { currentRating } = this.state;

    return (
      <div className="survey-icon">
        <ul className="survey-icon__list">
          {[5, 4, 3, 2, 1].map((value, idx) => (
            <li key={idx} className="survey-icon__item">
              <a
                className={`survey-icon__btn survey-icon__btn--${disable && 'disable'} survey-icon__btn--${value === currentRating ? 'active' : ''}`}
                onClick={() => !readOnly && this.onIconClick(value)}
              >
                <IconSvg rating={value} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
