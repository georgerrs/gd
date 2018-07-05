import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './howWeWork.css';

class howWeWork extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Contact Page</h1>
          <p>Coming soon</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(howWeWork);
